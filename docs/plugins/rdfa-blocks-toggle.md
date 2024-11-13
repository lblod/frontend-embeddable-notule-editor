# Rdfa Blocks Toggle

> [!WARNING]
> This plugin is deprecated. In a future release, a more robust way of showing
> rdfa data will be included.


## Setup
```javascript
const editor = await renderEditor({
  plugins: [/*...*/, "rdfa-blocks-toggle"], 
  /*...*/
})

```

## Usage
This plugin adds a *Toon annotaties* toggle in the top toolbar. 
It toggles the visibility of RDFa information contained in the document. 
This is useful if you want to check for errors in the RDFa structure, or simply have a look at what data the editor is generating behind the scenes. As such, it is mostly useful for expert users.  

![document with rdfa blocks visible](https://github.com/lblod/frontend-embeddable-notule-editor/assets/126079676/279900d3-7798-43e5-a560-298d15cf937c)

#### rdfa-awareness

Visualizes rdfa.
