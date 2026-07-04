# Mood Checker

A playful one-page mood picker built with HTML, CSS, SVG, and GSAP, just for fun.


<img width="2143" height="316" alt="emojis" src="https://github.com/user-attachments/assets/8ab60437-8b71-4998-8fd4-2175eaec8eaa" />

Emojis are taken from my Figma Plugin Emoji Express: https://github.com/kolodzey/figma-smiley-express.

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
