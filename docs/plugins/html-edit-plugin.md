# HTML Edit

## Setup

```javascript
const editor = await renderEditor({
  plugins: [, /*...*/ "html-edit"],
  /*...*/
});
```

## Usage

This plugin enables a toolbar button which displays the HTML representation of the current editor contents and allows it to be modified.

#### rdfa-awareness

While there are no specific RDFa aware features of this plugins, when the RDFa Aware mode of the editor is activated, this will significantly influence the markup that the editor produces, as it will now contain hidden elements to contain the annotations.
This also limits the HTML that can be entered as it will be processed so that it continues to be valid before it is applied to the editor.
