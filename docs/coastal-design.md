# Puur Geeske — coastal design, 22 October 2026

## Direction

A complete replacement of the previous left-aligned hero and ruled service list. The new layout uses a centered identity and headline, an inset sunset film, three clear entry paths, photo-led offerings, personal photography, and a rose invitation over an aubergine footer. Instrument Serif and DM Sans are self-hosted with Next Font. Actual services, prices, contact details, and the lotus logo are preserved. No testimonials, qualifications, class times, or availability have been invented.

## Media

- `public/videos/coastal-hero.mp4` and `public/images/coastal-hero-poster.webp`: licensed Pexels footage; full provenance is in `public/videos/COASTAL-SOURCE.md`.
- `public/images/geeske-yoga-beach.jpg` and `public/images/geeske-group-beach.jpg`: existing authentic photographs retained.
- `public/images/yoga-still-life.webp` and `public/images/coastal-ritual.webp`: generated supporting still-life imagery using the built-in image-generation tool. These do not depict Geeske's actual premises. Original PNGs retained in the Codex generated_images directory. Converted to WebP at 1000 × 1250 with Sharp.

### Final generation prompts

**Yoga materials**

Create one photorealistic editorial interior still-life photograph for the website of a premium Dutch yoga teacher. Portrait composition 4:5. A thick rolled dusty lavender yoga mat, soft dusky rose linen bolster and natural cork yoga block rest on warm pale limestone flooring, with a sheer ivory curtain at the side. Refined natural textures, real fabric wrinkles, soft sculptural afternoon sunlight with long shadows, a warm muted plum, blush and cream palette, restrained contemporary Dutch interior styling. Tight beautifully balanced composition filling frame, close viewpoint, 50mm lens, subtle fine film grain, exceptionally high-end interior magazine photography. No humans, no text, no logo, no flowers, no candles, no excessive props. Not a room advertised as the actual teacher's studio; symbolic practice still life. No collage or UI.

**Meditation materials**

Create one photorealistic editorial still-life photograph for a premium Dutch yoga and breathwork teacher website. Portrait 4:5 composition. A softly folded ivory linen cloth and pale mauve meditation cushion next to a single handmade shallow ceramic bowl on a sunlit travertine ledge, a small branch of olive leaves softly casting shadows on warm cream plaster. Intimate tactile detail, gauzy linen, warm morning sun, gentle contrasting shadows, muted sandy beige, pale pink and lavender color story. Sophisticated minimalist boutique wellness editorial photographed on medium-format film, natural imperfect material details, deeply restful and beautiful. No people, no spa model, no text, no typography, no logos, no candles, no crystals, no collage, no graphics. Image is symbolic not a depiction of a specific business venue.

## Behavior

The hero uses muted inline looping playback, with a 44px pause/play control. Reduced-motion and initial save-data preferences keep the poster until explicit playback. Video pauses offscreen and in background tabs, while preserving manual pause. Class links carry the selected service into Contact and the WhatsApp/email inquiry.

## Verification

- Production build and TypeScript completed successfully after the final changes.
- Browser checks at desktop, 768px tablet and 390px mobile widths: no horizontal overflow, navigation and class cards fit.
- Main CTA and workshop links scroll correctly; mobile menu opens and closes after selection.
- Yin Yoga selection carries into Contact and into WhatsApp/email inquiry links.
- Hero playback is muted and plays inline; the retained pause/resume and motion-preference implementation remains in place. Offscreen playback pauses.
- FAQ opens and closes. Small text on lavender surfaces was darkened after review.
- Public deployment is still blocked by access to the existing Vercel hosting scope. Local preview is http://localhost:3100/.
