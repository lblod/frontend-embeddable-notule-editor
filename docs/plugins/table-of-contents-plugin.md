# Table of Contents

> [!NOTE]
>This plugin is planned to be reworked. If you are currently using it, we would
>love to hear your thoughts.

Add a table of contents at the top of the document. It can be toggled with a button in the top toolbar. 

## Setup
```javascript
const editor = await renderEditor({
  plugins: [/*...*/,"table-of-contents"], 
  options: {
    docContent: /*adjust to include `table_of_contents?` as an accepted node*/ ,
    tableOfContents: [
      {
        nodeHierarchy: [
          'title|chapter|section|subsection|article',
          'structure_header|article_header',
        ],
      },
    ],
  }
  /*...*/
})

```

At this time it will only work with the [article-structure plugin](/docs/plugins/article-structure-plugin.md).

⚠️ For use in different situations, open an issue on this repo with the usecase, so we can help. The [Prosemirror schema](https://prosemirror.net/docs/guide/#schema) that is used in the config is not public-facing yet, so changing this is not trivial.
#### `nodeHierarchy`
a list of regex strings to specify the node structure. The default value works for the [article-structure plugin](#article-structure). 
The first string are the main nodes that should be added to the structure.
The strings afterwards are the sub-nodes of the main node that should be used to find the actual content to display in the table of contents.
#### `docContent`
You will need to adjust `docContent` to accept `table_of_contents?`, as it is not part of the `block` group. See [general config options](general-config-options) for more info.

**note**: this config is a *list*. Multiple `nodeHierarchy`s can be passed to let the table of contents work in multiple situation. The last matching hierarchy will be used.

## Usage


#### rdfa awareness

As mentioned above, this plugin will only work with structures from the `article-structure` plugin,
which are of course rdfa-annotated.
