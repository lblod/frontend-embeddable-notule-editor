# Configuring the editor toolbar
> [!WARNING]
>This document is a work in progress. 
>The features described in this document are not (yet) public API.

The editor toolbar can be configured through a simple API which allows you to easily enable/disable toolbar widgets, and arrange the widgets in different toolbar groups.

A toolbar always consists of a `main` section, and a `side` section.
- The `main` section is the most prevalent option, and may take most of the toolbar width
- The `side` option is shown on the right side of the toolbar. If there is not enough toolbar space, the `side` section will be collapsed first, toolbar group by toolbar group. Ensure that toolbar groups do not contain too many widgets at once, as their contents will not wrap onto a new line (regardless of screen size).

An example of a simple toolbar:
```ts
toolbar: {
  main: [['undo', 'redo'], ['bold', 'italic', 'strikethrough']],
  side: [],
}
```

Rendered:
![alt text](/docs/images/example-toolbar_simple.png)

The above example configures a toolbar with a simple `main` section, and no `side` section.

You can find an index of all toolbar widgets below.
Some widgets are only available if a certain plugin is configured.

## An overview of toolbar widgets

### Core toolbar widgets

| Widget identifier | Description                             |
| ----------------- | --------------------------------------- |
| `undo`            | Undo the last editor transaction        |
| `redo`            | Redo the last undone editor transaction |
| `bold`            | Apply bold styling                      |
| `strikethrough`   | Apply strikethrough styling             |
| `underline`       | Apply underline styling                 |
| `subscript`       | Apply subscript styling                 |
| `superscript`     | Apply superscript styling               |
| `highlight`       | Apply text highlight                    |
| `color`           | Apply text color                        |
| `indentation`     | Indent/unindent content                 |
| `heading`         | Apply heading style                     |
| `list:bullet`     | Insert/configure bullet list            |
| `list:numbered`   | Insert/configure numbered list          |
| `alignment`       | Align content                           |
| `hyperlink`       | Insert hyperlink                        |
| `image`           | Insert image                            |
| `table`           | Insert/configure table                  |
| `formatting`      | Show hide formatting marks              |


### HTML plugin

The following widgets are available when the `html` plugin is configured.

| Widget identifier | Description                           |
| ----------------- | ------------------------------------- |
| `html:preview`    | Preview the html output of the editor |
| `html:edit`       | Edit the html output of the editor    |
  
### Table of contents plugin

The following widgets are available when the `table-of-contents` plugin is configured.


| Widget identifier   | Description                            |
| ------------------- | -------------------------------------- |
| `table-of-contents` | Toggle visibility of table of contents |

### Besluit topic plugin

The following widgets are available when the `besluit-topic` plugin is configured.

| Widget identifier | Description          |
| ----------------- | -------------------- |
| `besluit-topic`   | Select decision (besluit) topic |

