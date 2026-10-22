# Coastal hero video

- **Asset:** `coastal-hero.mp4`
- **Poster:** `../images/coastal-hero-poster.webp`
- **Original:** [Waves Crashing on a Shore](https://www.pexels.com/video/waves-crashing-on-a-shore-6423302/) by **Az Horsley** on Pexels.
- **Download:** https://videos.pexels.com/video-files/6423302/6423302-uhd_3840_2160_25fps.mp4
- **License:** [Pexels License](https://www.pexels.com/license/), checked 22 October 2026. Pexels permits free website and commercial use, modification, and does not require attribution. Do not resell or redistribute as stock, imply endorsement, or use as a trademark.
- **Treatment:** The first 20 seconds of the 3840 × 2160, 25 fps original, downscaled to 1280 × 720, H.264, yuv420p, CRF 26, fast-start MP4. No audio track. No color alteration or generated imagery. Poster is the first encoded frame, converted to WebP quality 88.
- **Delivered size:** 3,546,673 bytes video; 48,954 bytes poster.
- **Visual selection:** Luminous pink and lavender sky, a clear sea horizon, soft foamy waves washing diagonally across sand. No people, boats, logos, or text were visible in samples across the selected segment. The footage has a gentle natural pan; it is a standard looping clip, not a mathematically seamless loop.

## Reproduction

```sh
ffmpeg -i original.mp4 -t 20 -an -vf scale=1280:720 -c:v libx264 -preset slow -crf 26 -pix_fmt yuv420p -movflags +faststart coastal-hero.mp4
ffmpeg -i coastal-hero.mp4 -frames:v 1 coastal-poster.png
```

Poster PNG was converted with Sharp `.webp({ quality: 88 })`.
