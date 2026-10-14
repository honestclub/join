# join
Landing page for Honest Club

## Media slots

The homepage has slots for photos and an intro video that stay on their
fallbacks until the files exist. Drop a file at the path below and push.
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

### Intro video (30 to 60 seconds)

The slot under the hero CTA is hidden until `media/andrew-intro.mp4` exists.
Add all three files together:

- `media/andrew-intro.mp4`: H.264 MP4, 16:9, ideally under 15 MB
- `media/andrew-intro-poster.webp`: the still shown before play, 1280×720
- `media/andrew-intro.en.vtt`: English captions (WebVTT)

It never autoplays.
