# Article Structure

## Setup

```javascript
const editor = await renderEditor({
  plugins: [, /*...*/ "article-structure"],
  /*... currently no configuration is possible */
});
```

## Usage

This plugin is in charge of inserting and manipulating structures. There are several insertion buttons in the right sidebar under _Document Structuren_.

After inserting a structure and selecting it, a card will show options to move and delete the structure. These might be disabled if the action is not possible. Using the button _en inhoud verwijderen_ will also delete everything included in the structure, instead of just the closest heading.

#### rdfa-awareness

The structures the plugin inserts are rdfa-annotated according to a custom model. This model
is as of yet undocumented, and currently considered for internal usage only.

We are currently working on building templates for regulations, which use these
structures. When these materialize, we intend to document and solidify the
data model this plugin follows, and we don't expect it will be extremely
different from what is there now.
