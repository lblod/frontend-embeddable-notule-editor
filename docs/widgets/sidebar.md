# Configuring the editor sidebar

The editor toolbar can be configured through a simple API which allows you to easily enable/disable sidebar widgets.
Two types of sidebar widgets may be configured:

- Card widgets: these are widgets which may be configured at the root of the sidebar
- List-item widgets: these are widgets which may only be configured as part of a (collapsible) sidebar group.

An example of a simple sidebar:

```ts
sidebar: [
  // List-item widgets
  ["besluit:article-insert", "lpdc:insert"],
  {
    title: "Second collapsible group",
    initallyExpanded: false,
    items: ["citation:insert", "location:insert"],
  },
  //Card widgets
  "structure:edit",
  "citation:edit",
];
```

Rendered:
![alt text](/docs/images/example-sidebar_simple.png)

The above example configures a simple sidebar with two collapsible groups, and two card widgets.

A collapsible group may be configured in two ways:

- As a simple array
- Using an object, in which you can provide some additional configuration options:
  - `title`: the title of the group (default: 'Invoegen' (nl-be), 'Insert' (en-us))
  - `initiallyExpanded`: whether the toolbar should be initially expanded or not (default: `true`)
  - `items`: the list-item widgets configured as part of the group

You can find an index of all toolbar widgets below.
Some widgets are only available if a certain plugin is configured.

## An overview of sidebar widgets

### Besluit plugin

The following widgets are available when the `besluit` plugin is configured.

| Widget identifier        | Widget type | Description                                         |
| ------------------------ | ----------- | --------------------------------------------------- |
| `besluit:article-insert` | List-item   | Insert a decision (besluit) article in the document |
| `structure:edit`         | Card        | Configure/adjust a decision article                 |

### Besluit topic plugin

The following widgets are available when the `besluit-topic` plugin is configured.

| Widget identifier | Widget type | Description                     |
| ----------------- | ----------- | ------------------------------- |
| `besluit:topic`   | Card        | Select decision (besluit) topic |

### Lpdc plugin

The following widgets are available when the `lpdc` plugin is configured.

| Widget identifier | Widget type | Description          |
| ----------------- | ----------- | -------------------- |
| `lpdc:insert`     | List-item   | Insert LPDC instance |

### Article structure plugin

The following widgets are available when the `article-structure` plugin is configured.

| Widget identifier          | Widget type | Description                                 |
| -------------------------- | ----------- | ------------------------------------------- |
| `article-structure:insert` | List-item   | Insert an article structure in the document |
| `structure:edit`           | Card        | Configure/adjust an article structure       |

### Citation plugin

The following widgets are available when the `citation` plugin is configured.

| Widget identifier | Widget type | Description                                             |
| ----------------- | ----------- | ------------------------------------------------------- |
| `citation:insert` | List-item   | Insert a citation into the document                     |
| `citation:edit`   | Card        | Used to insert a citation with the autocomplete feature |

### Roadsign regulation plugin

The following widgets are available when the `roadsign-regulation` plugin is configured.

| Widget identifier            | Widget type | Description                               |
| ---------------------------- | ----------- | ----------------------------------------- |
| `roadsign-regulation:insert` | List-item   | Insert a mobility measure in the document |

### Location plugin

The following widgets are available when the `location` plugin is configured.

| Widget identifier | Widget type | Description            |
| ----------------- | ----------- | ---------------------- |
| `location:insert` | List-item   | Insert/edit a location |

### Template comments plugin

The following widgets are available when the `template-comments` plugin is configured.

| Widget identifier          | Widget type | Description                                 |
| -------------------------- | ----------- | ------------------------------------------- |
| `template-comments:insert` | List-item   | Insert a template comment into the document |
| `template-comments:edit`   | Card        | Configure/edit a template comment           |

### Variable plugin

The following widgets are available when the `template-comments` plugin is configured.

| Widget identifier | Widget type | Description                         |
| ----------------- | ----------- | ----------------------------------- |
| `variable:insert` | Card        | Insert a variable into the document |
| `variable:edit`   | Card        | Configure/edit a variable           |

### Rdfa-editor (devtools) plugin

The following widgets are available when the `rdfa-editor` plugin is configured.

| Widget identifier           | Widget type | Description                                                                      |
| --------------------------- | ----------- | -------------------------------------------------------------------------------- |
| `devtools:rdfa-editor`      | Card        | Allows a user to inspect/configure the RDFa of the active node                   |
| `devtools:attribute-editor` | Card        | Allows a user to inspect/configure the Prosemirror attributes of the active node |
| `devtools:debug-info`       | Card        | Allows a user to inspect additional information of the active node               |
