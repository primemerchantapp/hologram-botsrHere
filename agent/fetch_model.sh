#!/usr/bin/env bash
set -euo pipefail

FIREBASE_MODEL_URL="https://firebasestorage.googleapis.com/v0/b/aitek2023-8f504.appspot.com/o/karen%20(2).imx?alt=media&token=86059263-3140-465c-aed5-7404f3b2a032"

[[ -f "$MODEL_PATH" ]] && { echo "✔ karen.imx cached"; exit 0; }

mkdir -p "$MODEL_DIR"
echo "⇣ Downloading karen.imx from Firebase..."
curl -L --retry 3 --output "$MODEL_PATH" "$FIREBASE_MODEL_URL"
echo "✔ Saved to $MODEL_PATH"
