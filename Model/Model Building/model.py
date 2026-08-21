import csv
import numpy as np
import json
import tensorflow as tf
from tensorflow.keras import layers, Model  # type: ignore
from tensorflow.keras.applications import EfficientNetV2S  # type: ignore
from tensorflow.keras.applications import efficientnet_v2  # type: ignore
from tensorflow.keras.callbacks import EarlyStopping  # type: ignore
from sklearn.metrics import confusion_matrix, classification_report
import matplotlib.pyplot as plt
import seaborn as sns
from pathlib import Path

# ---- Paths ----
data_dir = Path(__file__).resolve().parents[1] / "Data"
train_csv_path = data_dir / "processed" / "image_train.csv"
test_csv_path = data_dir / "processed" / "image_test.csv"
artifacts_dir = Path(__file__).resolve().parent / "artifacts"
figures_dir = artifacts_dir / "figures"

def read_split(csv_path):
    paths, labels, categories = [], [], []
    with open(csv_path, newline="") as f:
        for row in csv.DictReader(f):
            paths.append(str(data_dir / row["filepath"]))
            labels.append(int(row["category_encoded"]))
            categories.append(row["category"])
    return paths, labels, categories


train_paths, train_labels, train_cats = read_split(train_csv_path)
test_paths, test_labels, test_cats = read_split(test_csv_path)

with open(data_dir / "processed" / "label_mappings.json") as f:
    label_mapping = json.load(f)["category"]

class_names = sorted(
    set(train_cats) | set(test_cats),
    key=lambda c: label_mapping[c],
)
NUM_CLASSES = len(class_names)

print("Classes:", class_names)
print(f"Train: {len(train_paths)}, Test: {len(test_paths)}")

IMG_SIZE = 224
BATCH_SIZE = 32


def load_image(path, label):
    img = tf.io.read_file(path)
    img = tf.image.decode_image(img, channels=3, expand_animations=False)
    img.set_shape([None, None, 3])
    img = tf.image.resize(img, [IMG_SIZE, IMG_SIZE])
    img = tf.cast(img, tf.float32)
    img = efficientnet_v2.preprocess_input(img)
    return img, label


data_augmentation = tf.keras.Sequential([
    layers.RandomFlip("horizontal"),
    layers.RandomRotation(0.05),
    layers.RandomZoom(0.1),
    layers.RandomContrast(0.1),
])


def augment(img, label):
    return data_augmentation(img, training=True), label


train_ds = tf.data.Dataset.from_tensor_slices((train_paths, train_labels))
train_ds = train_ds.map(load_image, num_parallel_calls=tf.data.AUTOTUNE)
train_ds = train_ds.map(augment, num_parallel_calls=tf.data.AUTOTUNE)
train_ds = train_ds.shuffle(buffer_size=1000)
train_ds = train_ds.batch(BATCH_SIZE)
train_ds = train_ds.prefetch(tf.data.AUTOTUNE)

test_ds = tf.data.Dataset.from_tensor_slices((test_paths, test_labels))
test_ds = test_ds.map(load_image, num_parallel_calls=tf.data.AUTOTUNE)
test_ds = test_ds.batch(BATCH_SIZE)
test_ds = test_ds.prefetch(tf.data.AUTOTUNE)

# ---- Class weights (WATER_DRAINAGE has far fewer images) ----
counts = np.bincount(np.asarray(train_labels), minlength=NUM_CLASSES)
class_weight = {i: len(train_labels) / (NUM_CLASSES * c) for i, c in enumerate(counts)}
print("Class weights:", {class_names[k]: round(v, 2) for k, v in class_weight.items()})

# ---- Build Model with Transfer Learning ----
base_model = EfficientNetV2S(
    include_top=False,
    weights="imagenet",
    input_shape=(IMG_SIZE, IMG_SIZE, 3),
)
base_model.trainable = False

inputs = layers.Input(shape=(IMG_SIZE, IMG_SIZE, 3))
x = base_model(inputs, training=False)
x = layers.GlobalAveragePooling2D()(x)
x = layers.Dense(256, activation="relu")(x)
x = layers.Dropout(0.3)(x)
outputs = layers.Dense(NUM_CLASSES, activation="softmax", name="category_output")(x)

model = Model(inputs=inputs, outputs=outputs)

model.compile(
    optimizer=tf.keras.optimizers.Adam(learning_rate=1e-3),
    loss="sparse_categorical_crossentropy",
    metrics=["accuracy"],
)

model.summary()

if __name__ == "__main__":
    early_stop_phase1 = EarlyStopping(
        monitor="val_loss",
        mode="min",
        patience=3,
        restore_best_weights=True,
        verbose=1,
    )

    print("\n===== PHASE 1: Training with frozen backbone =====\n")
    history_phase1 = model.fit(
        train_ds,
        validation_data=test_ds,
        epochs=5,
        class_weight=class_weight,
        callbacks=[early_stop_phase1],
    )

    # ---- Phase 2: Fine-tuning (unfreeze top layers of backbone) ----
    print("\n===== PHASE 2: Fine-tuning top layers of backbone =====\n")

    base_model.trainable = True

    # pehle 70% backbone freeze rakho - early layers generic features
    # (edges, textures) seekhte hain, unhe touch karne ki zaroorat nahi
    n_layers = len(base_model.layers)
    for layer in base_model.layers[: int(n_layers * 0.7)]:
        layer.trainable = False
    for layer in base_model.layers:
        if isinstance(layer, layers.BatchNormalization):
            layer.trainable = False  # BN stats ko fine-tune mein disturb mat karo

    model.compile(
        optimizer=tf.keras.optimizers.Adam(learning_rate=1e-5),  # chhota LR, warna pretrained weights bigad jayenge
        loss="sparse_categorical_crossentropy",
        metrics=["accuracy"],
    )

    early_stop_phase2 = EarlyStopping(
        monitor="val_loss",
        mode="min",
        patience=3,
        restore_best_weights=True,
        verbose=1,
    )

    history_phase2 = model.fit(
        train_ds,
        validation_data=test_ds,
        epochs=5,
        class_weight=class_weight,
        callbacks=[early_stop_phase2],
    )

    # ---- Final Evaluation ----
    print("\n===== FINAL EVALUATION =====\n")
    results = model.evaluate(test_ds)
    print(results)

    # ---- Training Curves ----
    figures_dir.mkdir(parents=True, exist_ok=True)

    acc = history_phase1.history["accuracy"] + history_phase2.history["accuracy"]
    val_acc = history_phase1.history["val_accuracy"] + history_phase2.history["val_accuracy"]
    loss = history_phase1.history["loss"] + history_phase2.history["loss"]
    val_loss_hist = history_phase1.history["val_loss"] + history_phase2.history["val_loss"]
    split = len(history_phase1.history["accuracy"])

    plt.figure(figsize=(10, 4))
    plt.subplot(1, 2, 1)
    plt.plot(acc, label="train")
    plt.plot(val_acc, label="val")
    plt.axvline(split - 0.5, ls="--", c="gray")
    plt.title("Accuracy")
    plt.xlabel("epoch")
    plt.legend()
    plt.subplot(1, 2, 2)
    plt.plot(loss, label="train")
    plt.plot(val_loss_hist, label="val")
    plt.axvline(split - 0.5, ls="--", c="gray")
    plt.title("Loss")
    plt.xlabel("epoch")
    plt.legend()
    plt.tight_layout()
    plt.savefig(figures_dir / "training_curves.png", dpi=150)
    plt.close()

    # ---- Saving Model ----
    print("\n===== SAVING MODEL =====\n")
    model_dir = artifacts_dir / "models"
    model_dir.mkdir(parents=True, exist_ok=True)
    model.save(model_dir / "civic_classifier.keras")
    print(f"Model saved at: {model_dir / 'civic_classifier.keras'}")

    # ---- Confusion Matrix ----
    print("\n===== GENERATING CONFUSION MATRIX =====\n")
    y_true = []
    y_pred = []

    for images, labels in test_ds:
        preds = model.predict(images, verbose=0)
        y_true.extend(labels.numpy())
        y_pred.extend(np.argmax(preds, axis=1))

    cm = confusion_matrix(y_true, y_pred)
    plt.figure(figsize=(8, 6))
    sns.heatmap(cm, annot=True, fmt="d", cmap="Blues",
                xticklabels=class_names, yticklabels=class_names)
    plt.title("Category Confusion Matrix")
    plt.xlabel("Predicted")
    plt.ylabel("Actual")
    plt.tight_layout()
    plt.savefig(figures_dir / "confusion_matrix.png", dpi=150)
    plt.close()

    report = classification_report(y_true, y_pred, target_names=class_names, digits=4)
    print("\nClassification Report:")
    print(report)

    with open(artifacts_dir / "classification_report.txt", "w") as f:
        f.write(report)
    np.savetxt(artifacts_dir / "confusion_matrix.csv", cm, fmt="%d", delimiter=",")

    print(f"Artifacts saved at: {artifacts_dir}")
