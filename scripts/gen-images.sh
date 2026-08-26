#!/usr/bin/env bash
# Pre-generate responsive AVIF + WebP + JPEG for every source image.
# Runs at author time, not build time — the output is committed and served
# immutable, so there is no image-optimizer round trip on a cold visit.
set -euo pipefail
cd "$(dirname "$0")/.."
OUT=public/opt
mkdir -p "$OUT"

IMAGES="
public/videos/intro-poster.jpg|intro-poster|480,768,1024,1440,1920
public/videos/nazomer-poster.jpg|nazomer-poster|480,768,1024,1440,1920
public/images/geeske-yurt-selfie.jpg|yurt-selfie|400,640,816
public/images/geeske-group-beach.jpg|group-beach|480,768,1024
public/images/geeske-yoga-beach.jpg|yoga-beach|480,768,1024
"

for row in $IMAGES; do
  src="${row%%|*}"; rest="${row#*|}"
  name="${rest%%|*}"; widths="$(echo "${rest#*|}" | tr ',' ' ')"
  [ -f "$src" ] || { echo "skip (missing): $src"; continue; }
  for w in $widths; do
    ffmpeg -y -v error -i "$src" -vf "scale=${w}:-2:flags=lanczos" \
      -c:v libaom-av1 -still-picture 1 -crf 34 -cpu-used 6 -pix_fmt yuv420p \
      "$OUT/${name}-${w}.avif" </dev/null
    ffmpeg -y -v error -i "$src" -vf "scale=${w}:-2:flags=lanczos" \
      -c:v libwebp -quality 72 -compression_level 6 -pix_fmt yuv420p \
      "$OUT/${name}-${w}.webp" </dev/null
  done
  fw=$(echo $widths | awk '{print $1}')
  ffmpeg -y -v error -i "$src" -vf "scale=${fw}:-2:flags=lanczos" \
    -q:v 6 "$OUT/${name}-${fw}.jpg" </dev/null
  echo "done: $name"
done

for w in 224 320 448; do
  ffmpeg -y -v error -i public/images/logo-full.png -vf "scale=${w}:-2:flags=lanczos" \
    -c:v libwebp -quality 80 -compression_level 6 "$OUT/logo-${w}.webp" </dev/null
done
ffmpeg -y -v error -i public/images/logo-full.png -vf "scale=448:-2:flags=lanczos" \
  "$OUT/logo-448.png" </dev/null
echo "done: logo"
