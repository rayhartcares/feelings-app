# Emotions Explorer — FRUSTRATED (Same style, new content)

This mini-program replicates the **style and flow** of the *Angry* version but replaces **all content** (scenario, choices, science). It is **commercially safe**: original code, emoji-only graphics, and no external libraries.

## Files
- `index.html` — standalone HTML (no external CDN)
- `styles.css` — gradients, buttons, layout
- `script.js` — interactivity (same function names as Angry so it's drop-in compatible)

## How to integrate under one umbrella
Place this folder at:
```
emotions/frustrated/
```
Then link from your main menu (e.g. `index.html`) or dynamically load `/emotions/frustrated/index.html` into your app container.

## Run locally
Open `index.html` in a browser, or run a tiny server:
```bash
python -m http.server 8000
```

## Publish (GitHub Pages)
Commit this folder to your repo (e.g., `feelings-app/emotions/frustrated/`). It will be live at:
```
https://<username>.github.io/feelings-app/emotions/frustrated/
```

© 2025 Brave Feelings Lab. All rights reserved.
