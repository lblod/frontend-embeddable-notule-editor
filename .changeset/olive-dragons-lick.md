---
"@lblod/embeddable-say-editor": patch
---

Fix toolbar scrolling in all instances

If you were using an explicit height set with the (undocumented) `cssVariables` argument to `renderEditor`, you can likely remove it now, the editor should now correctly scroll in any scenario.
