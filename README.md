# join
Landing page for Honest Club

## Media slots

The homepage has slots for photos that stay on their fallbacks until the
files exist, plus the intro video. Drop a file at the path below and push.
No code changes needed.

### Photos of Andrew

Each slot is an `<img data-photo="…" data-photo-alt="…">` in `index.html`.
The landscape image shows until the `data-photo` file is on the server,
then `site.js` swaps the real photo in along with its `data-photo-alt` text.
Once a photo is live, update its `data-photo-alt` in `index.html` so it
describes what is actually in the shot.

| Where | File |
| --- | --- |
| Who I coach: Product designers | `images/web/andrew/who-designers.webp` |
| Who I coach: Creatives | `images/web/andrew/who-creatives.webp` |
| Who I coach: People in tech | `images/web/andrew/who-tech.webp` |
| Values: Honesty | `images/web/andrew/value-honesty.webp` |
| Values: Listening | `images/web/andrew/value-listening.webp` |
| Values: Inner work | `images/web/andrew/value-inner-work.webp` |
| Values: Champion | `images/web/andrew/value-champion.webp` |

Card photos crop to 4:3 (export at 800×600). Values photos crop to 3:2
(export at 1104×736). WebP, under about 150 KB each.

### Intro video

The hero plays `media/andrew-intro.mp4` (vertical 9:16, about 30 seconds)
with `media/andrew-intro-poster.webp` as the still shown before play. Its
captions are burned into the video, so there is no separate captions file.
It never autoplays.

To swap in a new video, replace those two files with the same names. Keep
it vertical, and re-encode before committing so the page stays light:

```
ffmpeg -i new.mov -c:v libx264 -preset slow -crf 24 -pix_fmt yuv420p \
  -c:a aac -b:a 96k -movflags +faststart media/andrew-intro.mp4
ffmpeg -ss 0.6 -i new.mov -frames:v 1 -c:v libwebp -quality 80 \
  media/andrew-intro-poster.webp
```
