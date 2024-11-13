# Article Structure

> [!NOTE]
>This plugin is planned to be reworked. If you are currently using it, we would
>love to hear your thoughts.

## Setup

```javascript
const editor = await renderEditor({
  plugins: [/*...*/,"article-structure"], 
  /*...*/
})

```
## Usage

This plugin is in charge of inserting and manipulating structures. There are several insertion buttons in the right sidebar under *Document Structuren*.

After inserting a structure and selecting it, a card will show options to move and delete the structure. These might be disabled if the action is not possible. Using the button *en inhoud verwijderen* will also delete everything included in the structure, instead of just the closest heading. 

Anything part of the `block` group (almost everything) is allowed under these structures. However, the article structure nodes themselves are only allowed in a specific order. 

![article structure card and insert buttons example](https://github.com/lblod/frontend-embeddable-notule-editor/assets/126079676/9920df02-3e9c-43c2-bf7e-fdce182439b9)

***

These structures are not part of the `block` group. You will need to edit `docContent` to accept one of these structures as a base. The following config will allow a title, chapter or article to be added as the first node, or any general block. See [the config reference](/docs/configuration.md) for more info.
```javascript
options: {
  docContent: '((title|block)+|(chapter|block)+|(article|block)+)'
}
```

#### rdfa-awareness

The structures the plugin inserts are rdfa-annotated according to a custom model. This model
is as of yet undocumented. For more information please contact the team.
