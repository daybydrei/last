# Prompt pack · 1 of 2 — style lock, characters, environments

The reader already works with placeholder panels. This pack is everything you need to make the
real ones with an image generator, so all 21 panels look like one chapter.

## Workflow (do it in this order)

1. **Make the two model sheets first** (prompts below). Pick one result for each character and
   keep it as the reference image for everything else. Do not move on until Andu and Yukie look
   right. Every later panel depends on them.
2. **Generate panels one at a time** from `02-panel-prompts.md`. Paste the STYLE LOCK first, then
   the character blocks for whoever is in the panel, then the panel prompt.
   Attach the model sheet(s) as reference images if your tool supports it.
3. **Reject anything with text in it.** Lettering is added by the reader in code. If a generator
   paints letters, speech bubbles, sound effects or a border, regenerate.
4. **Size:** generate a little larger than the target and downscale. Full panels 1080 px wide,
   narrow ("inset") panels 720 px wide. The exact pixel sizes are in each prompt.
5. **Save as WebP** (quality ≈ 80) named `panel-01.webp` … `panel-21.webp` and overwrite the
   placeholder in `assets/panels/`. Refresh the page. Nothing else needs changing.
6. **Do not feed the source chapter's pages to the generator as image input.** Describe the
   composition in words (the prompts already do). This keeps the art original.
7. Calm areas: each prompt says which part of the frame to keep quiet (sky, wall, floor). Speech
   balloons will sit there. Use `?guides` on the reader URL to see where every balloon lands.

## STYLE LOCK (paste at the start of every panel prompt)

> Original Korean romance webtoon illustration, digital painting with clean cel shading and soft
> gradient overlays. Clean, thin, coloured lineart: warm dark-brown lines on skin, near-black on
> hair and clothing, slightly heavier outer contours, fine interior detail. Realistic-idealised
> adult proportions (not chibi, not super-deformed, not big-eyed anime). Naturalistic almond eyes
> with a thick upper lash line, brown irises with a warm lower gradient and two catchlights; a
> minimal nose (a small tick and a soft shadow); small glossy lips. Hair drawn as heavy ribbons
> with dense parallel strand lines and a broad glossy highlight band. Porcelain-peach skin with
> rose shadows, soft airbrushed blush plus a few fine diagonal blush ticks. Backgrounds are
> soft-focus with shallow depth of field while the characters stay crisp. Warm saturated palette;
> golden-hour rim light outdoors, soft even light indoors. Vertical webtoon panel, no border.
> Absolutely no text, letters, speech bubbles, sound effects, watermark, signature or UI.

**AVOID (negative prompt / "do not" list):** photorealistic, photograph, 3D render, western comic
book, heavy black ink or hatching, thick outlines, chibi, super-deformed, flat vector, plastic
skin, extra fingers, distorted hands, text, lettering, speech bubbles, watermark, panel border.

## CHARACTER BLOCKS (paste the ones that appear in the panel)

**ANDU**
> Andu, 22, university student. Slim, about 8 heads tall, roughly 178 cm. Blue-black hair
> (#1B1B24), soft and slightly tousled with a see-through side-swept fringe, ears partly visible.
> Soft jaw, gentle double eyelids, dark-brown eyes, thin straight brows, small nose. He blushes
> easily (ears and nose bridge first). Thin round metal-frame glasses, identical in every panel.
> OUTFIT, NEVER CHANGES: slate-navy (#3C4250) oversized zip jacket with a knit collar over an
> oat-white (#EDE4D3) crew-neck knit, dark trousers, a dark canvas crossbody bag with the strap
> across his chest.

*If your generator cannot keep the glasses consistent, delete the glasses line from every prompt
rather than letting them come and go.*

**YUKIE**
> Yukie, 25, office worker, an adult woman. About 7.5 heads tall, roughly 165 cm (a little
> shorter than Andu). Long, softly waved black hair (#1C1518) past the chest, with curtain bangs
> framing her face. Warm brown eyes with a soft, slightly downturned outer corner, a tiny beauty
> mark under her right eye, a fine pendant necklace. CAMPUS OUTFIT: greige wool coat (#CDB9A8)
> over an ivory (#F1EBE0) ribbed knit top. CAFÉ OUTFIT (coat off): ivory ribbed off-shoulder
> sweater with long sweater-paw sleeves that cover her fingers, dark tights, black boots. Natural,
> tasteful styling.

## ENVIRONMENT BLOCKS

**CAMPUS, GOLDEN HOUR (panels 01–08)**
> Early-spring evening on a modern university campus: a grey building with rows of dark-framed
> windows, a tall evergreen, a cherry tree in full pink bloom, a pale utility pole, a paved plaza,
> low hedges. The sun is low; the sky is a nearly flat orange gradient (#F08A4B to #E9743E). Warm
> rim light on hair and clothes.

**CAFÉ (panels 09–21)**
> A café with charcoal concrete walls, honey-wood tables and benches (#C79A64), a shelf of
> colourful tumblers, menu boards, track lights, and a bright window with white blinds. Two
> patrons in white hoodies sit far back. A glass of iced water on the table. Soft, even, low-contrast
> light. Keep everything behind the characters soft-focus.

## MODEL SHEET PROMPTS

**Andu**
> [STYLE LOCK] Character model sheet of ANDU on a plain light-grey background. Top row: full body
> standing, front / three-quarter / side / back, in his fixed outfit. Bottom row: head-and-shoulders
> expressions: neutral, startled, deeply blushing, embarrassed half-smile, sincere and steady.
> Consistent face and proportions in every view. [ANDU block] No text or labels.

**Yukie**
> [STYLE LOCK] Character model sheet of YUKIE on a plain light-grey background. Top row: full body
> standing, front / three-quarter / side / back, in her campus outfit; then one full-body view in
> her café outfit. Bottom row: head-and-shoulders expressions: neutral, curious, laughing, teasing
> smile, gentle and certain, soft blush. Consistent face and proportions in every view.
> [YUKIE block] No text or labels.

## CONTINUITY CHECKLIST (look at every panel before you keep it)

- Same face shape, eyes and hair for each character. Andu's glasses present (or absent) everywhere.
- Andu's outfit identical. Yukie's coat on outdoors, off in the café.
- Sky orange outdoors; café walls charcoal and wood indoors.
- Nothing painted that looks like text.
- Hands have five fingers.
- Café panels 18, 20 and 21: Yukie's sweater sleeves cover her fingers.
