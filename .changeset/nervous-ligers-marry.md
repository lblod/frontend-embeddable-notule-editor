---
"@lblod/embeddable-say-editor": major
---

- Update `@lblod/ember-rdfa-editor` to version 10.3.0. Note: this dependency update also includes dependency updates of other required packages.
- Update `@lblod/ember-rdfa-editor-lblod-plugins` to version 22.4.0
  * Version 21.0.0 introduces a new, more intuitive UI and UX for decision articles.
  * Removal of the classic `decision` prosemirror-nodes. These were no longer required and are now replaced by more generic RDFa nodes. See [the plugins changelog](https://github.com/lblod/ember-rdfa-editor-lblod-plugins/blob/master/CHANGELOG.md#2100) for details. This is a breaking change as it changes the HTML output of these structures.
