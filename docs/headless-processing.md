# Headless processing

Note: This is a low-level api which directly exposes the underlying [Prosemirror](https://prosemirror.net) datastructures and concepts. We highly recommend to give their excellent docs a read to familiarize yourself with these ideas.

While the controller object that is returned from the `renderEditor` function is very powerful for implementing custom features (see [the api docs](../api.md)), sometimes an app may want to process editor documents "headlessly", that is to say: without showing an editor instance to the user.

Of course, since the editor operates on HTML, it is already possible by simply manipulating HTML like any other. However, this is cumbersome at best, and quite fragile. This is because the editor transforms HTML into its own [datastructure](https://prosemirror.net/docs/guide/#doc) when it loads it. As such, adjusting the html can have unexpected effects, such as some interactive nodes (such as the [location](../plugins/location.md)) might lose their interactivity.

For this reason, we provide a powerful low-level api for editing the document in the same way the editor does, using Prosemirror concepts such as [EditorState](https://prosemirror.net/docs/ref/#state.Editor_State) and [Transactions](https://prosemirror.net/docs/ref/#state.Transaction).

## processDocumentHeadlessly

```ts


interface TransactionCombinatorResult<R> {
  /**
   * The state that was passed to the monad
   */
  initialState: EditorState;

  /**
   * The resulting transaction
   */
  transaction: Transaction;

  /**
   * Whether the monad was successful, or any other extra result you might want to add
   */
  result: R;

  /**
   * All the transactions that were applied in sequence to achieve this result, including any potential extra transactions from plugins.
   * This allows calling code to inspect and use any non-document state that may have been lost
   * such as selections, storedMarks and custom metadata
   */
  transactions: Transaction[];
}

export function processDocumentHeadlessly(
  html: string,
  transactionGenerator: (
    state: EditorState,
  ) => TransactionCombinatorResult<boolean>,
  editorConfig: EditorOptions,
): string
```

With this low-level api, the adventurous developer can essentially do everything we can do. However, we also provide an abstraction for the common usecase of replacing a part of the document with generated content. For this, see the [locked-placeholder plugin](../plugins/locked-placeholder.md).



