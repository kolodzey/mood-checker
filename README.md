# Mood Checker

A playful one-page mood picker built with HTML, CSS, SVG, and GSAP.

The app starts with a looping animated face. When the user clicks **"That's my mood!"**, the animation pauses, the current mood is shown, and the button changes to **"One more time ..."** so the user can restart the loop.

## Features

- SVG face animation with multiple moods
- GSAP-powered morphing between expressions
- Button interaction to pause and restart the mood loop
- Mood label shown only after the user chooses a mood
- Responsive layout with a mobile breakpoint at 600px
- Lightweight static frontend with no build step required

## Tech Stack

- HTML
- CSS
- JavaScript
- SVG
- GSAP 3
- MorphSVGPlugin

## Run Locally

Start a local static server from the project folder:

```bash
python3 -m http.server 8000
```

Then open:

```text
http://127.0.0.1:8000
```

## Notes

The page currently loads GSAP and MorphSVGPlugin from the CDN in `index.html`. The `gsap` npm dependency is not required for the browser version unless you want to manage GSAP locally through npm later.
