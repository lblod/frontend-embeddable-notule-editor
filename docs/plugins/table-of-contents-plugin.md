# Table of Contents

Add a table of contents at the top of the document. It can be toggled with a button in the top toolbar. 

> [!NOTE]
> This plugin requires either the `besluit` or `article-structure` plugin to be
> active. If that's not the case, the plugin simply won't show anything, and print
> a warning in the console.

## Setup
```javascript
const editor = await renderEditor({
  plugins: [/*...*/,"table-of-contents"], 
  options: {
    // new config (note: no array)
    tableOfContents: {
      // optional. 
      scrollContainer: undefined,
    },

    // legacy config, is currently ignored and will print a console warning
    // tableOfContents: [
    //   {
    //     nodeHierarchy: [
    //       'title|chapter|section|subsection|article',
    //       'structure_header|article_header',
    //     ],
    //     // optional
    //     scrollContainer: undefined,
    //   },
    // ],
  }
  /*...*/
})

```
### Options

`scrollContainer: () => HTMLElement`: by default, the editor will search for the first scrollable
ancestor. It will use this element to scroll to the relevant section of the document when the user clicks on a ToC entry.
In rare cases, this is not the correct element. You can provide a function to
find the correct element in this case.


#### legacy options

The legacy options no longer work and are a no-op. The plugin works in
a different way and no longer requires the specification of the hierarchy.




