---
'frontend-embeddable-notule-editor': major
---

Changes the workings of the `besluit` and `article-structure` plugins

- the modes for `article-structure` are gone.
- `besluit` and `article-structure` can be used together
- no more configuration needed for either plugins
- some more documentation about using `article-structure` effectively

Now the besluit plugin adds besluit nodes and adds the insert buttons for these node(s) (before it only added the structure)
Now the article structure plugin adds article structure nodes and insert buttons (like before) and is not connected at all anymore with besluit nodes (before insert buttons for besluit nodes were added via article structure plugin)

To migrate:
- What was `article-structure` in `regulatoryStatement` mode before is now just the `article-structure` plugin, without specifying a mode.
- What was `article-structure` in `besluit` mode before is now just the `besluit` plugin, without specifying a mode. 