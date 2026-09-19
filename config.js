/* ==========================================================================
   ANDU × YUKIE — CHAPTER 198   (webtoon reader config)

   One entry per panel, top to bottom. To swap artwork, overwrite the file in
   assets/panels/ with the same name and size ratio. Nothing else changes.

   PANEL FIELDS
     id        "01"…  (also the file number)
     src       image path (png recommended)
     w, h      pixel size of the artwork (sets the exact aspect ratio)
     width     "full" (100% of the column) | "inset" (narrower panel, ~66%)
     align     inset only: "center" (default) | "left" | "right"
     frame     false to remove the thin ink frame (default: framed)
     gap       space ABOVE the panel: none | tight | beat | pause | breath  (or a number)
     pace      lettering speed: "normal" | "slow"
     motion    { parallax: true|false, push: true|false }
     alt       description for screen readers / missing-image fallback
     shot,note storyboard label + note (used by the placeholder fallback)
     lettering list of items, revealed in order (see below)

   LETTERING ITEMS  (x, y, w are % of the panel box; balloons grow to fit text)
     { who, text, x, y, w, tail:{ side:"bottom|top|left|right", pos:0–1, len } }
     { who, kind:"shaky", … }                     hand-drawn wobbly balloon
     { who, kind:"thought", dots:"r|l|br|bl", … } thought balloon
     { balloons:[ {…}, {…} ] }                     merged balloons (one outline)
     { kind:"sfx",  style:"chu|nudge|hand|lift|plain", text, x, y, size, rot }
     { kind:"mark", mark:"burst|tremble|q", x, y, size, rot }
     Add  big:true  for a larger balloon,  wait:ms  to pause before the NEXT item.
   ========================================================================== */

window.CHAPTER = {
  meta: {
    title: "Andu × Yukie — Chapter 198",
    names: "Andu × Yukie",
    chapter: "Chapter 11",
    begin: "Begin",
    end: "End of Chapter 198",
    readAgain: "Read again",
  },

  layout: {
    insetWidth: 66,          // % of the column used by "inset" panels
    gaps: { none: 0, tight: 3.5, beat: 9, pause: 20, breath: 34 },   // in % of column width
  },

  /* Music starts when the reader taps Begin, then loops until they mute it.
     assets/audio/theme.mp3 is a placeholder loop: replace it with any track. */
  audio: {
    music: { src: "assets/audio/theme.mp3", volume: 0.6, fadeInMs: 3000 },
  },

  panels: [
    /* ───────────── CAMPUS · GOLDEN HOUR ───────────── */
    {
      id: "01", src: "assets/panels/panel-01.png", w: 1080, h: 1403, width: "full", gap: "none",
      motion: { parallax: true },
      alt: "Andu stands alone on campus at golden hour, hands in his jacket pockets, startled.",
      shot: "MEDIUM · EYE LEVEL · FRONTAL",
      note: "Andu, hips-up, hands in pockets, bag strap across chest, brows up, lips parted. Soft-focus campus building and tree behind. Sky open at top-left.",
      lettering: [
        { who: "andu", text: "Huh…?", x: 20, y: 2.5, w: 21, tail: { side: "bottom", pos: 0.78, len: 0.35 } },
      ],
    },
    {
      id: "02", src: "assets/panels/panel-02.png", w: 720, h: 1346, width: "inset", gap: "beat",
      motion: { parallax: true },
      alt: "Yukie glances back over her shoulder toward the viewer, a blossom tree glowing behind her.",
      shot: "TALL PORTRAIT · THREE-QUARTER · OVER SHOULDER",
      note: "Yukie turns her head back toward camera, hair falling forward, calm curiosity, lips barely parted. Blossom tree and utility pole on an orange sky.",
      lettering: [
        { who: "yukie", text: "Hm?", x: 80, y: 37.5, w: 16, tail: { side: "left", pos: 0.55, len: 0.3 } },
      ],
    },
    {
      id: "03", src: "assets/panels/panel-03.png", w: 1080, h: 1208, width: "full", gap: "beat",
      motion: { parallax: true },
      alt: "Andu hurries toward Yukie, baffled, while she stands calmly with her back to us.",
      shot: "WIDE MEDIUM · OVER YUKIE'S SHOULDER",
      note: "Andu strides in at left, fist at chest, mouth open, sweat drop. Yukie at right seen from behind, relaxed. Campus plaza, trees, building.",
      lettering: [
        { who: "andu", text: "What are you doing here? What about work??", x: 2, y: 1, w: 43, tail: { side: "bottom", pos: 0.62, len: 0.3 } },
        { kind: "mark", mark: "q", x: 28, y: 27, size: 6, rot: -14, instant: true },
        { kind: "mark", mark: "q", x: 41, y: 24, size: 6, rot: 12, instant: true },
        { who: "yukie", text: "What do you mean? I got here right after work.", x: 50, y: 80, w: 44, tail: { side: "top", pos: 0.55, len: 0.25 } },
      ],
    },
    {
      id: "04", src: "assets/panels/panel-04.png", w: 1080, h: 1147, width: "full", gap: "beat",
      motion: { parallax: true },
      alt: "Andu and Yukie face each other in profile against a flat orange sunset, both blushing.",
      shot: "PROFILE TWO-SHOT · CHEST-UP · EYE LEVEL",
      note: "Both in profile facing each other, sunset sky as a nearly flat orange field. He glances down, she looks up. Both blushing. Upper third open for lettering.",
      lettering: [
        { balloons: [
          { who: "andu", text: "Oh… I-I see.", x: 4, y: 1, w: 37 },
          { who: "andu", text: "What brings you here?", x: 13, y: 6.5, w: 38, tail: { side: "bottom", pos: 0.5, len: 0.35 } },
        ] },
        { who: "yukie", text: "I said I miss you.", x: 56, y: 23, w: 34, tail: { side: "bottom", pos: 0.3, len: 0.35 } },
      ],
      pace: "slow",
    },
    {
      id: "05", src: "assets/panels/panel-05.png", w: 720, h: 650, width: "inset", gap: "pause",
      motion: { parallax: true },
      alt: "Over Andu's shoulder, his hand cups Yukie's cheek; her eyes are closed and she kisses his hand.",
      shot: "OVER-THE-SHOULDER · MEDIUM CLOSE · FROM BEHIND ANDU",
      note: "Back of Andu's head and shoulder in the foreground; his hand cups Yukie's cheek. Her eyes are closed, blushing, lips pressed to his hand. Blossoms behind.",
      lettering: [
        { kind: "sfx", style: "chu", text: "Chu-", x: 64, y: 5, size: 13, rot: -8 },
      ],
    },
    {
      id: "06", src: "assets/panels/panel-06.png", w: 720, h: 515, width: "inset", gap: 10,
      motion: { push: true },
      alt: "Extreme close-up of Andu, flushed and wide-eyed, with sweat on his brow.",
      shot: "EXTREME CLOSE-UP · ANDU · SLIGHT LOW ANGLE",
      note: "Andu's face fills the frame: deep blush, sweat drop, startled wide eyes. Edge of Yukie's hair intrudes at bottom-right.",
      lettering: [
        { who: "yukie", text: "Andu, don’t you have something to say to me?", x: 34, y: -6, w: 68, tail: { side: "bottom", pos: 0.8, len: 0.3 } },
        { kind: "mark", mark: "burst", x: 82, y: 50, size: 12, instant: true },
      ],
    },
    {
      id: "07", src: "assets/panels/panel-07.png", w: 720, h: 1331, width: "inset", gap: "beat",
      motion: { push: true },
      alt: "Yukie tilts her cheek into his hand, one eye closed, smiling and blushing.",
      shot: "TALL CLOSE-UP · YUKIE · CHEEK INTO HAND",
      note: "Yukie presses her cheek into his palm, one eye closed, warm smile, blush across nose and cheeks. Sunset orange behind, blossom edge at right.",
      lettering: [
        { who: "yukie", text: "And?", x: 12, y: 0.7, w: 26, tail: { side: "bottom", pos: 0.85, len: 0.4 } },
        { kind: "sfx", style: "nudge", text: "Nudge", x: 68, y: 31, size: 6.5, rot: -14 },
        { who: "yukie", text: "Aren’t you gonna say it?", x: 44, y: 72, w: 54, tail: { side: "top", pos: 0.15, len: 0.3 } },
        { kind: "sfx", style: "nudge", text: "Nudge", x: 8, y: 81, size: 6.5, rot: -14 },
      ],
    },
    {
      id: "08", src: "assets/panels/panel-08.png", w: 1080, h: 1440, width: "full", gap: "beat",
      motion: { parallax: true },
      alt: "Andu, eyes squeezed shut and trembling, panics as Yukie watches; he blurts that he will.",
      shot: "OVER YUKIE'S SHOULDER · MEDIUM · HIGH ANGLE",
      note: "Yukie's hair large in the left foreground, back to us. Andu at right, eyes whited-out, flustered. Campus greens and sunset. Top open for lettering, calm floor at the bottom.",
      lettering: [
        { who: "andu", kind: "shaky", text: "I-I… I will!", x: 38, y: 1.5, w: 42, tail: { side: "bottom", pos: 0.72, len: 0.32 } },
        { kind: "mark", mark: "tremble", x: 62, y: 30, size: 34, instant: true },
        { kind: "sfx", style: "plain", text: "Waaah~", x: 50, y: 91, size: 6 },
      ],
    },

    /* ───────────── THE CAFÉ ───────────── */
    {
      id: "09", src: "assets/panels/panel-09.png", w: 1080, h: 978, width: "full", gap: "breath",
      motion: { push: true },
      alt: "Yukie laughs, eyes half-closed and blushing, in a grey café.",
      shot: "CLOSE-UP · YUKIE LAUGHING · SCENE CHANGE",
      note: "Yukie's laughing face, eyes half closed, blush, soft smile. Background has cut to a grey café wall and blurred blinds.",
      lettering: [
        { kind: "sfx", style: "hand", text: "So cute,\nhaha~", x: 15, y: 23, size: 7.5, rot: -20 },
      ],
    },
    {
      id: "10", src: "assets/panels/panel-10.png", w: 1080, h: 1229, width: "full", gap: "beat",
      motion: { parallax: true },
      alt: "Andu sits at a café table, flushed and unsure, shelves of tumblers blurred behind him.",
      shot: "MEDIUM CLOSE-UP · ANDU · FRONTAL · CAFÉ",
      note: "Andu at the café table, blushing, glancing aside. Blurred shelf of colourful tumblers, menu boards, track lights behind.",
      lettering: [
        { balloons: [
          { who: "yukie", text: "Come on~", x: 64, y: 1, w: 30 },
          { who: "yukie", text: "I’m tired of waiting!", x: 58, y: 8, w: 40, tail: { side: "right", pos: 0.75, len: 0.35 } },
        ] },
        { kind: "mark", mark: "burst", x: 14, y: 17, size: 12, instant: true },
        { who: "andu", text: "Uh… yeah…", x: 28, y: 84, w: 26, tail: { side: "top", pos: 0.55, len: 0.3 } },
      ],
    },
    {
      id: "11", src: "assets/panels/panel-11.png", w: 720, h: 1379, width: "inset", gap: "beat",
      motion: { parallax: true },
      alt: "Yukie sits with crossed legs and folded arms, head tilted, seen from a low angle.",
      shot: "FULL-LENGTH · SEATED · LOW ANGLE",
      note: "Yukie seated, low angle from below the knees: legs crossed, arms folded, head tilted, faint blush. Café wall and window blinds behind.",
      lettering: [
        { who: "yukie", text: "Or should I just say it?", x: 16, y: 0.5, w: 68, tail: { side: "bottom", pos: 0.5, len: 0.3 } },
      ],
    },
    {
      id: "12", src: "assets/panels/panel-12.png", w: 1080, h: 1515, width: "full", gap: "beat",
      motion: { push: true },
      alt: "Yukie laughs openly, a big bright smile, about to say something.",
      shot: "CLOSE-UP · YUKIE · OPEN LAUGH",
      note: "Yukie mid-laugh, bright open smile, head tilted, hair flowing, slight blush. Grey café wall behind, calm space top-left.",
      lettering: [
        { who: "yukie", text: "I think… I…", x: 14, y: 2, w: 31, tail: { side: "bottom", pos: 0.3, len: 0.32 } },
        { who: "yukie", kind: "thought", dots: "r", text: "haha~", x: 10, y: 47, w: 16 },
      ],
    },
    {
      id: "13", src: "assets/panels/panel-13.png", w: 1080, h: 1532, width: "full", gap: "beat",
      motion: { push: true },
      alt: "Andu in profile, one hand over his mouth, deeply blushing as he half-confesses.",
      shot: "CLOSE-UP · ANDU PROFILE · HAND ON MOUTH",
      note: "Andu in profile, fingers at his chin and mouth, deep blush across cheek and ear, sweat drop. Tight crop, café shadows behind.",
      lettering: [
        { who: "andu", text: "I mean… I really like you, Yukie…", x: 44, y: 2.5, w: 47, tail: { side: "bottom", pos: 0.42, len: 0.3 } },
        { kind: "sfx", style: "hand", text: "Blush", x: 80, y: 23, size: 7, rot: -20 },
        { kind: "sfx", style: "hand", text: "Blush", x: 8, y: 79, size: 7, rot: -20 },
        { who: "andu", text: "So, you know…", x: 22, y: 84.5, w: 42, tail: { side: "top", pos: 0.55, len: 0.25 } },
      ],
    },
    {
      id: "14", src: "assets/panels/panel-14.png", w: 1080, h: 1023, width: "full", gap: "pause",
      motion: { push: true },
      alt: "Extreme close-up of Yukie's eyes, cheeks pink, pouting: not satisfied yet.",
      shot: "EXTREME CLOSE-UP · YUKIE'S EYES · WIDE STRIP",
      note: "Tight strip on Yukie's eyes and nose bridge, blush ticks, gaze lowered to the side, a small pout at the very bottom edge.",
      lettering: [
        { who: "yukie", text: "Hmph… again.", x: 38, y: 4, w: 48, tail: { side: "bottom", pos: 0.42, len: 0.3 } },
      ],
    },
    {
      id: "15", src: "assets/panels/panel-15.png", w: 1080, h: 1446, width: "full", gap: "beat",
      motion: { parallax: true },
      alt: "Andu, hands clasped and trembling, startled, as Yukie's hair frames the edge of the panel.",
      shot: "MEDIUM · OVER YUKIE'S SHOULDER · ANDU FRONTAL",
      note: "Andu seated, hands clasped at his lap, shoulders shaking, startled. Yukie's long hair enters at the right edge. Café shelves blurred behind.",
      lettering: [
        { who: "andu", text: "Eh?", x: 22, y: 1, w: 18, tail: { side: "bottom", pos: 0.55, len: 0.35 } },
        { kind: "mark", mark: "burst", x: 19, y: 30, size: 9, instant: true },
        { kind: "mark", mark: "burst", x: 36, y: 29, size: 9, instant: true },
        { who: "yukie", text: "You lack confidence…", x: 53, y: 73, w: 39, tail: { side: "top", pos: 0.82, len: 0.3 } },
        { who: "andu", text: "Oh…", x: 20, y: 90, w: 16, tail: { side: "top", pos: 0.75, len: 0.3 } },
      ],
    },

    /* ───────────── THE CENTREPIECE ───────────── */
    {
      id: "16", src: "assets/panels/panel-16.png", w: 720, h: 1452, width: "inset", gap: "breath", pace: "slow",
      music: 0.5,
      motion: { push: true },
      alt: "Yukie leans across the café table, hands clasped, gentle and certain: she is already his.",
      shot: "MEDIUM-LONG · YUKIE FRONTAL · HANDS CLASPED",
      note: "Yukie at the table, leaning slightly forward, hands clasped, head tilted, mouth open mid-line, gentle blush. The emotional centre of the chapter.",
      lettering: [
        { who: "yukie", big: true, wait: 1500, text: "Andu. I’m yours anyway.", x: 4, y: 0.5, w: 82, tail: { side: "bottom", pos: 0.42, len: 0.28 } },
        { who: "yukie", big: true, text: "So why are you worried?", x: 20, y: 91, w: 68, tail: { side: "top", pos: 0.55, len: 0.2 } },
      ],
    },

    /* ───────────── ANDU'S SECOND TRY ───────────── */
    {
      id: "17", src: "assets/panels/panel-17.png", w: 1080, h: 1312, width: "full", gap: "pause",
      motion: { parallax: true },
      alt: "Andu in profile at the café table, sincere, blushing, patrons blurred behind him.",
      shot: "MEDIUM · ANDU PROFILE · CAFÉ TABLE",
      note: "Andu in profile at the table, sincere, blushing, one sweat drop. Two patrons in white hoodies blurred at the back, iced glass in the foreground.",
      lettering: [
        { who: "andu", text: "I really like you a lot.", x: 40, y: 1.5, w: 46, tail: { side: "bottom", pos: 0.28, len: 0.3 } },
        { who: "andu", text: "I really mean it.", x: 49, y: 79, w: 39, tail: { side: "top", pos: 0.2, len: 0.28 } },
      ],
    },
    {
      id: "18", src: "assets/panels/panel-18.png", w: 720, h: 1379, width: "inset", gap: "beat",
      motion: { parallax: true },
      alt: "Yukie rests her chin on her sleeve-covered hands, smiling softly and blushing, listening.",
      shot: "TALL PORTRAIT · YUKIE · CHIN ON HANDS",
      note: "Yukie's elbows on the table, chin on her hands, sweater sleeves over her fingers, soft blushing smile, eyes on him. Silent reaction.",
      lettering: [
        { who: "andu", text: "I want to date you.", x: 6, y: 0.5, w: 50, tail: { side: "bottom", pos: 0.1, len: 0.28 } },
        { who: "andu", text: "I’ll do my best.", x: 44, y: 89, w: 52, tail: { side: "top", pos: 0.15, len: 0.28 } },
      ],
    },
    {
      id: "19", src: "assets/panels/panel-19.png", w: 720, h: 1343, width: "inset", gap: "beat",
      motion: { parallax: true },
      alt: "Andu, hands clasped on the table, blushing deeply as he makes his promise.",
      shot: "MEDIUM · ANDU FRONTAL · HANDS CLASPED ON TABLE",
      note: "Andu seated, hands clasped on the table, deep blush, small sweat drop, earnest. Café shelves and track lights blurred behind.",
      lettering: [
        { who: "andu", text: "I’ll do my best to be worthy of being your lover.", x: 6, y: 0.5, w: 88, tail: { side: "bottom", pos: 0.5, len: 0.28 } },
      ],
    },
    {
      id: "20", src: "assets/panels/panel-20.png", w: 1080, h: 1174, width: "full", gap: "beat",
      motion: { push: true },
      alt: "Yukie's sleeve-covered hand lifts Andu's chin, an extreme close-up of his flushed jaw.",
      shot: "EXTREME CLOSE-UP · CHIN LIFT · SLIGHT LOW ANGLE",
      note: "Andu's jaw and chin, tilted up, blush and a sweat drop. Yukie's long sweater sleeve and fingers lift his chin. Dim café wall behind.",
      lettering: [
        { who: "yukie", text: "You sneaky little guy~", x: 63, y: 3.5, w: 30, tail: { side: "right", pos: 0.9, len: 0.4 } },
        { kind: "sfx", style: "lift", text: "LIFT", x: 71, y: 64, size: 11, rot: -4 },
        { who: "andu", text: "What—? No no, I didn’t mean to emphasize…", x: 22, y: 69, w: 41, tail: { side: "top", pos: 0.3, len: 0.28 } },
      ],
    },
    {
      id: "21", src: "assets/panels/panel-21.png", w: 1080, h: 1462, width: "full", gap: "pause", pace: "slow",
      music: 1,
      motion: { push: true },
      alt: "Across the café table, Yukie leans in and kisses Andu. A white cup sits in the foreground.",
      shot: "LOW-ANGLE TWO-SHOT · ACROSS THE TABLE · THE KISS",
      note: "Low angle from table height. Yukie leans over the table and kisses Andu, her sleeved hand at his jaw. White cup in the foreground. Tender, not explicit.",
      lettering: [
        { kind: "sfx", style: "chu", text: "CHU-", x: 5, y: 2, size: 19, rot: -6 },
        { who: "yukie", text: "I love you ♥", x: 43, y: 6, w: 32, tail: { side: "bottom", pos: 0.6, len: 0.3 } },
        { who: "andu", text: "Mph", x: 26, y: 76, w: 17, tail: { side: "top", pos: 0.55, len: 0.3 } },
      ],
    },
  ],
};
