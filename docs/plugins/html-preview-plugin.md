# HTML Preview

## Setup
```javascript
const editor = await renderEditor({
  plugins: [/*...*/,"html-preview"], 
  /*...*/
})

```

## Usage

`"html-preview"` enables a modal which renders a preview of the editor contents if they were exported as HTML and put into an otherwise blank HTML document.


#### rdfa-awareness

While there are no specific RDFa aware features of this plugins, when the RDFa Aware mode of the editor is activated, this will significantly influence the markup that the editor produces, as it will now contain hidden elements to contain the annotations.
