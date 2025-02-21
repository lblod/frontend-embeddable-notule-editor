## Plugin system

The Say-editor is conceptualized as a core component which can be extended through a powerful plugin system.
This plugin system mirrors Prosemirror's own system, and in fact, the core itself is built using
a prosemirror instance with various always-enabled plugins, UI elements, and custom commands and utils.

Currently, due to portability concerns, this system is not directly exposed to the embeddable editor.
Instead, embeddable ships with a few pre-defined plugins which can be turned on or off, and have 
some of their configuration exposed. 

However, for using and configuring embeddable, it is still useful to [understand some of the concepts](/docs/rdfa.md)
that plugins use to create a smart editor.


## RDFA-aware plugins

Most plugins use [RDFA](/docs/rdfa.md) in some way to provide their features.

In some cases, they simply use it as a way to store information they need to operate.
For example: the [variable plugin](/docs/plugins/variable-plugin.md) will insert
nodes in the document that are rdfa-annotated with certain properties
that the plugin interacts with.
When loading a document from html, this is what the plugin will use to determine whether to render
its special interactive "pills" for a particular node.

### Contextual plugins
In other cases, plugins use rdfa to determine whether they should be "active" (show their UI) or not.
This is usually done based on the idea of "context".

Because html, and also the internal prosemirror datastructure, is a tree, there is an inherent hierarchy to the document.
At the top there's a root element, usually a `div`, which we also call the `doc` node, which contains the entire document.
It also contains the selection, the blinking text cursor or blue region that you are surely familiar with.
This idea of the selection being "inside" a certain node is what drives the context-aware plugins.
Essentially, all they do is walk up the tree structure from the point of the cursor, and see if they encounter
any nodes they're interested in.

This means we can have different plugins active depending on where you are in the document!

A third way a plugin might use rdfa, is by searching the document for the existence of a particular rdfa-annotated node,
and interacting with it (by adding content in that node, for example).

_Technical note: rather than interacting with html/rdfa directly, plugins interact with prosemirror's internal datastructure.
This is why adjusting the page html in the inspector or with javascript will not give any meaningful results. The provided interfaces are the only supported ways to interact with the
editor. In fact, the plugins each get their own controller, which is identical to the
controller we expose on the embeddable element._

## Managing Plugins
Embeddable ships with the following plugins available. 
These docs contain all the important info and configuration for the plugins. For more technical and Ember-specific explanations of every plugin, you can check out the readme of [lblod/ember-rdfa-editor-lblod-plugins](https://github.com/lblod/ember-rdfa-editor-lblod-plugins).

Every plugin can be enabled by passing its name to the `plugins` array and optionally its configuration in the `options` object with the `renderEditor` helper or in the initialization function `initEditor(arrayOfPluginNames, configurationOptions)`. (See also [the configuration reference](/docs/configuration.md))

Any configuration value not provided will use the default value, which are shown in the example configs of the plugins.

- [besluit](/docs/plugins/besluit-plugin.md): Provides the correct rdfa-structure for constructing a decision (besluit) with ways to move and delete them.
* [besluit](/docs/plugins/besluit-plugin.md): Provides the correct rdfa-structure for constructing a decision (besluit) with ways to move and delete them.
* [besluit-topic](/docs/plugins/besluit-topic-plugin.md): provides a dropdown to
select the topic of a `besluit` node
* [lpdc-plugin](/docs/plugins/lpdc-plugin.md): provides a way to search for and
insert lpdc services
* [citation](/docs/plugins/citation-plugin.md): Search and insert references to citations (a legal resource/expression).
* [roadsign-regulation](/docs/plugins/roadsign-regulation-plugin.md): Insert roadsign regulations, based on the registry managed and provided by MOW (Mobiliteit en Openbare Werken).
* [table-of-contents](/docs/plugins/table-of-contents-plugin.md): Show a table of contents with clickable sections defined by [article-structure](./docs/plugins/article-structure-plugin.md).
* [variable](/docs/plugins/variable-plugin.md): Allows insertion and filling in of custom rdfa variables.
* [formatting-toggle](/docs/plugins/formatting-toggle-plugin.md): Allows to toggle the formatting marks with a button.
* [rdfa-editing](/docs/plugins/rdfa-editing-plugin.md): Allows powerusers to
directly manipulate the rdfa information in the document
* [template-comments](/docs/plugins/template-comments-plugin.md): Allows insertion and editing of comment blocks to provide extra information to a user filling in a document. These are visually distinct units with a special RDFa type, which allows them to be filtered out during postprocessing.
* [confidential-content](/docs/plugins/confidential-content-plugin.md): Allows annotation of parts of the text to be redacted
* [html-edit](/docs/plugins/html-edit-plugin.md): Provides a toolbar button to
directly edit the html the editor is producing
* [html-preview](/docs/plugins/html-preview-plugin.md): Provides a toolbar button to preview the html the editor is producing
* [location](/docs/plugins/location-plugin.md): Provides ways to insert annotated addresses

