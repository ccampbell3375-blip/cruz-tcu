# Cruz Campbell — TCU Creative Component

A static site (plain HTML/CSS/JS, no build step) built for GitHub Pages.

## Publish on GitHub Pages
1. Create a new public repo (for example `cruz-tcu`).
2. Upload everything in this folder (keep the `css`, `js`, `images` folders).
3. Repo **Settings → Pages → Build and deployment**: Source = *Deploy from a branch*, Branch = `main`, folder = `/ (root)`.
4. After a minute your site is live at `https://YOUR-USERNAME.github.io/cruz-tcu/`. Send that URL to Admissions.

## Add your photos
Drop JPGs into the `images/` folder using the exact filenames below. The gray placeholders swap for your photos automatically. No code changes needed. Use landscape unless noted, under about 500 KB each (resize before upload).

| File | Where it appears |
|---|---|
| `hero-ready.jpg` | **Unlock reveal** — you ready to run (portrait, 4:5) |
| `tcu-visit.jpg`, `tcu-gameday.jpg` | Why TCU, "Back again" section |
| `football-carlsbad.jpg` | Football page, Carlsbad High card |
| `campus-tour.jpg` | Home + Why TCU — you touring TCU |
| `story-01.jpg` … `story-04.jpg` | My Story timeline |
| `carlsbad-01.jpg` … `carlsbad-03.jpg` | Carlsbad postcards |
| `carlsbad-day.jpg`, `carlsbad-sunset.jpg` | Carlsbad page |
| `football-01.jpg`, `football-02.jpg`, `football-03.jpg` | Football film room |
| `beyond-school.jpg`, `beyond-service.jpg`, `beyond-01.jpg` … `beyond-03.jpg` | Beyond the Field |

## Replace the placeholder text
- Add `?edit=1` to any page URL (e.g. `index.html?edit=1`) to highlight everything still left to fill in, in yellow. Without it, nothing is highlighted.
- Edit your number, email, and Hudl link at the top of `js/main.js` (`SITE` block).
- The five puzzle clues are in `index.html` (`data-text` on each `.clue`).
- Colors live at the top of `css/style.css`.

## Before you send it
- Test on your phone and a laptop.
- Open in a private window and play the puzzle once.
- Search the pages for `[` to catch any leftover brackets.
