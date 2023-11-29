---
"@lblod/embeddable-say-editor": patch
---

GN-4615: Fix display of some SVG icons

Overrides "fill" attribute of "g" elements with `fill="none"` with `fill="currentColor"`  
to make sure we see the icons. This is an artifact of using `svg-jar` to inline the icons.
