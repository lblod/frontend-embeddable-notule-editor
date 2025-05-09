# HTML output

The html we output is often used as input in further processing. For example, it
is a common requirement to generate PDF documents based on the html we generate.
In other cases, the generated html needs to be displayed somewhere, which means
it needs some styling applied to make it readable. This document attempts to
encode the supported ways to interact with this html output.

## A note about stability

It is a difficult task to stabilize the html output of a wysiwyg editor. To
tackle the various challenges we face, we often have to rethink the
implementation of a certain element, often (unintentionally) leading to subtle
changes in the html output.

Up until now, we've neve formally committed to supporting a certain html
structure or certain html attributes as part of our SemVer contract. We've tried
to maintain stability on a best-efforts basis, but going forward we will commit
to the rules described in this document.

Please help us out by reporting any deviation from this policy in the bug
tracker on this repo.

# Basic structure

## 2 kinds of nodes

In this guide, we will distinguish between 2 kinds of nodes: ones which carry
RDFa information, and ones which do not. They differ in html structure, so it is
an important distinction.

### Basic nodes

These nodes do not carry rdfa information. They are simply an html element with
a certain css class assigned to them, and directly contain their content, if
they have any.

### RDFa-aware nodes

In order to comfortably generate rdfa-information programmatically, the editor
deviates slightly from the conventional way to serialize RDFa. This does **not**
mean however that we generate non-compliant html, or non-compliant RDFa.
Compliance with both specs is _always_ guaranteed.

an rdfa-aware node is structured as follows:

```
<div>
   <div data-rdfa-container="true" style="display:none" class="say-hidden"></div>
   <div data-content-container="true">Content goes here</div>
</div>
```

I've used `div` in the example, because it is by far the most common element
used in these nodes. However, in the future we may also use other html nodes as
both the outer node and the container nodes.

As you can see, we need an invisible container to store the rdfa information. We
label it with a data-attribute, and we put the children of the node in a sibling
content-container node.

We do commit to always providing the `data-rdfa-container` and
`data-content-container` attributes.

This can be useful for example when generating PDF documents. In PDF, the
rdfa-information will get lost regardless of what we do, so it can be a useful
ability to be able to target the content containers directly.

**NOTE**: In the example the container nodes are direct children of the outer
node. This is not guaranteed (although it is in practice almost always the case), so we recommend always using `querySelector` or
equivalent methods to search for the containers you'd like to target.

## classes

All nodes carry a class, such that the output can be easily styled. All
classes which start with the `say-` prefix are considered stable.

## attributes

Unless explicitly mentioned in this document, other html attributes are not
(yet) to be considered stable. We make heavy use of `data-` attributes to drive
the editor parsing logic and to store various editor-specific information.

It is our intention to gradually stabilize some of the `data-` attributes which are useful
for working with the generated html. We are cautious here, because we are still
settling interally on which attributes to use.

# Noteworthy nodes

## the doc node

The doc node is simply what we call the outermost node of the document. It is
very important to the operation of the editor, as without a well-defined doc
node, the editor cannot begin parsing.

For that reason, we tag this node with the `data-say-document` attribute. It is
always an rdfa-aware node.

## paragraph

The paragraph is the second most important node we use. It is the basic
container for any text, and is also how the editor makes a newline when the user
hits the `enter` key.

It is always a `<p>` element, tagged with the `say-paragraph` class. Most other
nodes will not directly contain their text content, but rather have it wrapped
in a paragraph element.

## block-rdfa

The block-rdfa node is a generic container for rdfa knowledge. It has no special
meaning other than the data it carries. It is tagged with the `say-block-rdfa`
class, and has an optional `data-label` attribute which the editor uses to tell
the user what the block is about.

## structure

The structure node is likely our most complex node. It is also under active
development, so the guarantees we will provide here are limited.

The basic premise of this node is to support a "section"-like interface, meaning
it:

- can have a title
- can have a number
- can have a name, e.g. "article", or "chapter"
- has a body

This means it has an additional layer of structure in its content:

```
<div>
  <div data-rdfa-container="true"></div>
  <div data-content-container="true">
    <div>
      <h5> <span data-say-structure-title="true"><!-- optional! --></span> </h5>
      <div data-say-structure-content="true"></div>
    </div>
  </div>
</div>
```

The level of the header element can be different for each structure type.
