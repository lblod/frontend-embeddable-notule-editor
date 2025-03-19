---
"@lblod/embeddable-say-editor": minor
---

Refactor plugin system

Make the plugin setup and configuration modular, as well as (almost) fully typechecked.
Plugins now hinge on the definition of a plain PluginInitializer function, which
receives all the relevant configuration and should produce an
EmbeddedPluginSpec.

This spec can define all nodes, marks, nodeviews, prosePlugins, widgets and
other configuration the various elements need.

