---
"embeddable-say-editor": major
---

Adds a way to import the editor through npm

- rename the package to `embeddable-say-editor`
- export `renderEditor`, a function which renders the editor in an iframe
- export `SayWebComponent`, which can be imported and registered as a custom element
- adds a prepare script to bundle the project in an npm-compatible way
