from __future__ import annotations

import argparse
import json
import shutil
from pathlib import Path

import pandas as pd
from PIL import Image
from sklearn.model_selection import train_test_split

BASE_DIR = Path(__file__).resolve().parent
RAW_IMAGE_DIR = BASE_DIR / "raw" / "Sih dataset"
PROCESSED_DIR = BASE_DIR / "processed"
IMAGE_DIR = PROCESSED_DIR / "images"

VALID_IMAGE_EXTENSIONS = {".jpg", ".jpeg", ".png"}

CATEGORIES = [
    "ROADS",
    "STREET_LIGHTING",
    "WATER_DRAINAGE",
    "WASTE_MANAGEMENT",
    "TREES_ENVIRONMENT",
    "PUBLIC_INFRASTRUCTURE",
    "STRAY_ANIMALS",
    "OTHERS",
]


def is_valid_image(path: Path) -> bool:
    try:
        with Image.open(path) as img:
            img.verify()
        return True
    except Exception:
        return False


def collect_images(dataset_dir: Path) -> list[tuple[Path, str]]:
    entries = []
    for category_dir in sorted(p for p in dataset_dir.iterdir() if p.is_dir()):
        category = category_dir.name.strip().upper()
        if category not in CATEGORIES:
            print(f"Skipping unknown folder: {category_dir.name}")
            continue
        for path in sorted(category_dir.rglob("*")):
            if (
                path.is_file()
                and not path.name.startswith(".")
                and path.suffix.lower() in VALID_IMAGE_EXTENSIONS
            ):
                entries.append((path, category))
    return entries


def build_image_dataset(test_size: float, seed: int) -> None:
    if not RAW_IMAGE_DIR.exists():
        raise FileNotFoundError(f"Image dataset not found at {RAW_IMAGE_DIR}")

    entries = collect_images(RAW_IMAGE_DIR)
    if not entries:
        raise ValueError("No images found in the dataset folders.")

    if IMAGE_DIR.exists():
        shutil.rmtree(IMAGE_DIR)

    counters = {c: 0 for c in CATEGORIES}
    records = []
    rejected = []
    for src, category in entries:
        if not is_valid_image(src):
            rejected.append(src)
            continue
        counters[category] += 1
        dest_name = f"{category.lower()}_{counters[category]:04d}{src.suffix.lower()}"
        dest_dir = IMAGE_DIR / category
        dest_dir.mkdir(parents=True, exist_ok=True)
        dest = dest_dir / dest_name
        shutil.copy2(src, dest)
        records.append(
            {
                "filepath": str(dest.relative_to(BASE_DIR)),
                "filename": dest_name,
                "category": category,
            }
        )

    df = pd.DataFrame(records)
    mapping = {v: i for i, v in enumerate(CATEGORIES)}
    df["category_encoded"] = df["category"].map(mapping).astype(int)

    with open(PROCESSED_DIR / "label_mappings.json", "w") as f:
        json.dump({"category": mapping}, f, indent=2)
    df.to_csv(PROCESSED_DIR / "image_dataset.csv", index=False)

    stratify = df["category"] if df["category"].value_counts().min() >= 2 else None
    train_df, test_df = train_test_split(df, test_size=test_size, random_state=seed, stratify=stratify)
    train_df.to_csv(PROCESSED_DIR / "image_train.csv", index=False)
    test_df.to_csv(PROCESSED_DIR / "image_test.csv", index=False)

    print(f"Processed {len(df)} images ({len(rejected)} rejected as corrupt).")
    print("Saved outputs to", PROCESSED_DIR)
    print(f"  image_dataset.csv : {len(df)} rows")
    print(f"  image_train.csv   : {len(train_df)} rows")
    print(f"  image_test.csv    : {len(test_df)} rows")
    print("\nImage category distribution:")
    print(df["category"].value_counts().to_string())
    for path in rejected[:10]:
        print(f"  REJECTED: {path.name}")


def main() -> None:
    parser = argparse.ArgumentParser(description="Build the NagarDrishti image dataset.")
    parser.add_argument("--test-size", type=float, default=0.2, help="Fraction of data held out for testing.")
    parser.add_argument("--seed", type=int, default=42, help="Random seed for reproducibility.")
    args = parser.parse_args()

    PROCESSED_DIR.mkdir(parents=True, exist_ok=True)
    build_image_dataset(args.test_size, args.seed)


if __name__ == "__main__":
    main()
