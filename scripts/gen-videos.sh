#!/usr/bin/env bash
# Mobile renditions of Geeske's two films: 720p, faststart, so a phone never
# pulls the 1080p master. The 1080p files are her graded originals — untouched.
set -euo pipefail
cd "$(dirname "$0")/.."
for pair in "intro" "nazomer"; do
  src="public/videos/${pair}.mp4"
  out="public/videos/${pair}-720.mp4"
  [ -f "$src" ] || { echo "skip: $src"; continue; }
  ffmpeg -y -v error -i "$src" \
    -vf "scale=1280:-2:flags=lanczos" \
    -c:v libx264 -profile:v main -level 4.0 -preset slow -crf 25 \
    -maxrate 1100k -bufsize 2200k \
    -c:a aac -b:a 96k -ac 2 \
    -movflags +faststart -pix_fmt yuv420p \
    "$out" </dev/null
  echo "$(du -h "$src" | cut -f1) -> $(du -h "$out" | cut -f1)  $out"
done
