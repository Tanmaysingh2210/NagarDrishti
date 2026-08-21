import csv
import json
from pathlib import Path

import numpy as np
import tensorflow as tf
from tensorflow.keras.applications import efficientnet_v2  # type: ignore

data_dir = Path(__file__).resolve().parents[1] / "Data"
model_path = Path(__file__).resolve().parent / "artifacts" / "models" / "civic_classifier.keras"

IMG_SIZE = 224


def get_class_names():
    with open(data_dir / "processed" / "label_mappings.json") as f:
        label_mapping = json.load(f)["category"]

    categories = set()
    with open(data_dir / "processed" / "image_train.csv", newline="") as f:
        for row in csv.DictReader(f):
            categories.add(row["category"])

    return sorted(categories, key=lambda c: label_mapping[c])


def preprocess(path):
    img = tf.io.read_file(str(path))
    img = tf.image.decode_image(img, channels=3, expand_animations=False)
    img.set_shape([None, None, 3])
    img = tf.image.resize(img, [IMG_SIZE, IMG_SIZE])
    img = tf.cast(img, tf.float32)
    img = efficientnet_v2.preprocess_input(img)
    return tf.expand_dims(img, axis=0)


def main():
    img_path = Path(__file__).resolve().parents[2] / "image copy 3.png"

    if not img_path.exists():
        raise FileNotFoundError(f"Image not found: {img_path}")

    print(f"Image : {img_path}")
    print(f"Model : {model_path}")

    model = tf.keras.models.load_model(model_path)
    class_names = get_class_names()

    preds = model.predict(preprocess(img_path), verbose=0)[0]
    top3 = np.argsort(preds)[::-1][:3]

    print("\n===== PREDICTION =====")
    print(f"Category  : {class_names[top3[0]]}")
    print(f"Confidence: {preds[top3[0]] * 100:.2f}%")

    print("\nTop-3:")
    for idx in top3:
        print(f"  {class_names[idx]:<25} {preds[idx] * 100:.2f}%")


if __name__ == "__main__":
    main()
