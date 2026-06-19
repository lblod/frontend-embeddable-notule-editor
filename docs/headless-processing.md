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
): string;
```

As you can see, the transformation function takes in the state of the document, and is expected to return a `TransactionCombinatorResult`, which is an interface we developed.
In order to build this interface, we provide the `transactionCombinator` function, which we will explain in the next section.

## transactionCombinator

The transactionCombinator was born from a need to easily compose functions that act on the editor state and transform them.
In ProseMirror, state transformations are modelled using the `Transaction` class. This works well, but it's tricky to build reusable transformation logic using these.

So after some tinkering we came up with the combinator. It borrows concepts from functional programming, in particular the concept of monads, but familiarity with monads is not required to use it.

The basic idea is that the most natural way to describe a document transformation is a function `(state: EditorState) => Transaction`. This way, the function can be used on any given state. For example, you could image a transformation that upgrades each header node (think `h1, h2` etc) up to the next level. A function like that can easily act on any state by simply scanning the document for relevant nodes and upgrading them.

We've slighlty extended this idea by returning 2 more pieces of metadata along with the Transaction. We also return the initialState, and a `result` value, which indicates whether or not the processing was succesful. This is usually a boolean.

So we get to a signature we call a `TransactionMonad`, which looks like this:

```ts
export interface TransactionMonadResult<R> {
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
}

export type TransactionMonad<R> = (
  state: EditorState,
  /**
   * Metadata to be set on the transaction output from the monad
   */
  transactionMeta?: TransactionMeta,
) => TransactionMonadResult<R>;
```

These transformer functions, or "monads" as we call them, are what we pass to the `transactionCombinator` function, which runs them in sequence and does the necessary fiddly bits to combine the tranformations in a correct way.

Here's some example code to give you an idea of how the interface works in practice. This example implements the above usecase of upgrading each heading node to the next higher level.

```ts
import {
  processDocumentHeadlessly,
  transactionCombinator,
} from "@lblod/embeddable-say-editor";
import myConfig from "../my-config";

const initialHtml = `
<h1>hello world<h1>
<h2>hello world<h2>
<h3>hello world<h3>
<h4>hello world<h4>
`;

// this is the transactionMonad, which actually does the work
const upgradeHeaders = (state: EditorState) => {
  // make a new transaction, see prosemirror docs for more info on the EditorState object
  const tr = state.tr;

  // in prosemirror, it is usually best to work with plain positions as your primitive values, as that's what most
  // prosemirror apis expect to receive.
  const headerNodes: number[] = [];

  // descendants is also a prosemirror interface. It loops over the subtree of the node you start from, in this case
  // the `doc` node, so we visit every node in the document.
  tr.doc.descendants((node, pos) => {
    if (node.type.name === "heading") {
      headerNodes.push(pos);
      return false;
    }
    return true;
  });

  for (const pos of headerNodes) {
    const level = (tr.doc.nodeAt(pos)?.attrs.level as number | undefined) ?? 1;
    if (level > 1) {
      // this is what actually updates the document. Note: prosemirror documents are immutable, so this will not modify
      // the node directly, but rather tell prosemirror to construct the new document with these new attributes
      // you should NEVER adjust a node directly, always use prosemirror's interfaces
      tr.setNodeAttribute(pos, "level", level - 1);
    }
  }
  // this return type is described above
  return { initialState: state, transaction: tr, result: true };
};

// here we see that the transactionCombinator provides exactly the return type that the `processDocumentHeadlessly`
// function expects from its callback argument
const resultHtml = processDocumentHeadlessly(
  initialHtml,
  // note the double function invocation: transactionCombinator is a higher order function
  (state) => transactionCombinator<boolean>(state)([upgradeHeaders]),
  myConfig,
);
```

With this low-level api, the adventurous developer can essentially do everything we can do. However, we also provide an abstraction for the common usecase of replacing a part of the document with generated content. For this, see the [locked-placeholder plugin](../plugins/locked-placeholder.md).

The full signature of the combinator is as follows (once again note it is a higher order function):

```ts
transactionCombinator<R>(
  initialState: EditorState,
  initialTransaction?: Transaction,
  transactionMeta?: TransactionMeta,
)
  => (monads: TransactionMonad<R>[])
    => TransactionCombinatorResult<R>
```
