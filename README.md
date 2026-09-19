# Andu × Yukie — Chapter 11

A short, vertical-scrolling Korean-romance webtoon, built for phones. Open `index.html` to read it.

**Status: the reader is finished; the artwork is not.** Every panel is currently a *storyboard
placeholder* (flat frame, rough blocking, shot label) at the exact size of the real panel. The
speech balloons, sound effects, motion and music are all live on top of them, so you can already
read the whole chapter's timing. Replace the placeholders with your artwork and it becomes the
finished webtoon. See `prompts/` for everything needed to make those panels.

## Run it

- **Quickest:** double-click `index.html`. It works from a file.
- **Phone:** put the folder on any static host (Netlify Drop, GitHub Pages, Cloudflare Pages) and
  open the link. The page is marked `noindex`, but anyone with the link can read it.

## Replace a panel (the only thing you really have to do)

Overwrite `assets/panels/panel-XX.webp` with your art. Keep the same filename and the same shape
(width : height). Sizes are in `config.js` and in `prompts/02-panel-prompts.md`:

| Kind | Panels | Width |
|---|---|---|
| full | 01, 03, 04, 08, 09, 10, 12, 13, 14, 15, 17, 20, 21 | 1080 px |
| inset (narrower) | 02, 05, 06, 07, 11, 16, 18, 19 | 720 px |

WebP, quality ≈ 80. Art must contain **no text**: lettering is drawn by the reader.
Changed a size? Edit that panel's `w` and `h` in `config.js`.

## Files

```
index.html  style.css  script.js  config.js
assets/panels/   panel-01.webp … panel-21.webp   (placeholders, replace these)
assets/audio/    theme.mp3                       (placeholder loop, replace with any track)
assets/fonts/    lettering fonts (open licence)
prompts/         character bible + one prompt per panel
tools/           make_placeholders.py (regenerates the storyboard placeholders)
```

## Editing the story (`config.js`)

One entry per panel: image, size, width class, spacing above it (`gap`), motion, alt text, and a
`lettering` list. Every balloon has `x`, `y`, `w` (percent of the panel) and an optional tail.
The header of `config.js` lists every option. Useful ones:

- `gap: "none | tight | beat | pause | breath"`: the pause before a panel; the reader's pacing.
- `lettering`: `{ who, text, x, y, w, tail }` for a balloon; `kind: "shaky" | "thought"`;
  `{ balloons: [...] }` for merged balloons; `{ kind: "sfx", style, text }`; `{ kind: "mark" }`.
- `motion: { parallax: true }` (gentle drift) or `{ push: true }` (slow push-in on close-ups).
- `music: 0.5` on a panel dips the music volume while that panel is on screen.

Add `?guides` to the URL to outline every balloon box; `?clean` hides all UI (the "hide the UI"
test: the page should still read as a polished webtoon); `?begin` skips the opening.

## Music

Starts when the reader taps **Begin** (browsers require a tap), loops continuously, and can be
muted with the button in the top bar (the choice is remembered). `assets/audio/theme.mp3` is an
original placeholder loop; swap it for any track (trim silence at both ends for a clean loop).

## Reading options

Menu (⋯): Night mode, lettering size (A− / A+), Read again. Respects *reduce motion*: with it on,
panels and lettering simply appear, and nothing drifts or pops.

## Credits

Fonts: Comic Neue, Bangers, Gaegu (SIL Open Font License). The placeholder music loop and the
storyboard placeholders were generated for this project. The story follows the structure of
Chapter 198 of *Circles*; all artwork here is meant to be new, original artwork of Andu and Yukie.
