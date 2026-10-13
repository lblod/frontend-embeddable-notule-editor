---
"@lblod/embeddable-say-editor": major
"test-angular": patch
---

New UI for input-fields

This version introduces our new "floating" UI paradigm for all input fields (aka "variables"). We already saw this UI for number fields and for links, but now every interactive element in the text follows the same logic. Rather than requiring the user to fiddle with the sidebar, the edit-actions open immediately next to the interactive node, making it easy to discover, and following much more closely to established UI paradigms in other editors.

This is released as a breaking change, as we do not currently plan on maintaining support for the old "sidebar cards" workflow. Therefore, it is not possible to disable the new edit UI in this version. Since the UI is unobtrusive by design and only shows itself when needed, we did not see a reason to make it possible to disable it.

We are of course open to feedback. Let us know your usecases, and we can add new configuration options quite easily.

### Breaking changes

#### new ui

As part of this change, the following configuration options were removed, since they no longer make sense:

- the `variable:edit` widget: this enabled the sidebar-cards for the various variables. As mentioned, this workflow is no longer supported, and the new edit interfaces appear automatically in-place when a variable is selected.
- the `variable>edit>enable` option: this one never made much sense: why would you ever need variables that you couldn't edit? In the background, this used to also enable the parsing support for these interactive variables. But now, this is simply always enabled and has become a core feature of the editor. When a template is loaded which contains variables, they will always render as expected.


The `variable>insert>enable` option and widget does remain, since "filling in" interactive fields is a significantly different action compared to defining input fields. 


#### others

Additionally the deprecated "address" variable was removed, since it is superceded by the much more powerful "location" variable. The location variable can auto-convert from old address variables in your documents, but it is unlikely you'll have those in the first place.



