#!/bin/bash
# Generate image assets for the HeyGen Translate clone (original AI-generated visuals)
# Requires the z-ai CLI (npm i -g z-ai-cli). Any equivalent image generator works too —
# just drop the outputs into public/assets/ with the same file names.
set -u
OUT="public/assets"
mkdir -p "$OUT"

gen() {
  local prompt="$1"; local size="$2"; local out="$3"
  for attempt in 1 2 3; do
    if z-ai image -p "$prompt" -o "$out" -s "$size" >/dev/null 2>&1; then
      if [ -s "$out" ]; then echo "OK: $out"; return 0; fi
    fi
    sleep 2
  done
  echo "FAIL: $out"
  return 1
}

# Run all generations in parallel
gen "Young woman presenter talking directly to camera in a modern bright video studio, soft purple and lavender ambient lighting, professional microphone visible, medium shot, photorealistic video still, high quality" "1344x768" "$OUT/hero-still.png" &
gen "Man vlogger in casual shirt talking to camera in cozy home office with bookshelf, natural window light, photorealistic video frame, high quality" "1344x768" "$OUT/feature-vlogger.png" &
gen "Professional businesswoman in blazer presenting to camera, virtual studio backdrop with subtle violet gradient, clean corporate training video look, photorealistic, high quality" "1344x768" "$OUT/avatar-demo.png" &
gen "Close up portrait of smiling middle aged man with short beard, office bokeh background, professional headshot, natural lighting, photorealistic, high quality" "1024x1024" "$OUT/testimonial-1.png" &
gen "Portrait of confident creative man in his forties wearing dark sweater, studio background, professional headshot, photorealistic, high quality" "1024x1024" "$OUT/testimonial-2.png" &
gen "Portrait of friendly young man in casual button shirt, modern office background softly blurred, professional headshot, photorealistic, high quality" "1024x1024" "$OUT/testimonial-3.png" &
gen "Wide shot of diverse team watching multilingual video content on large screen in modern meeting room, purple accent lighting, photorealistic, high quality" "1344x768" "$OUT/cta-still.png" &

wait
echo "--- generation done ---"
ls -la "$OUT"
