---
'frontend-embeddable-notule-editor': major
---

Update all deps and necessary config values

- removed "template-variable" config section: this plugin was merged into the 
variable plugin, and all its config options are also moved there to reflect this.

- split up the variable plugin into "insert" and "edit" sections, for inserting
and "filling in" variables respectively. The "edit" behavior is what 
the now-removed template-variable plugin used to handle. Its options
have been moved verbatim to the variable->edit->location section.
This is because all its options only mattered for the location variable type.

- adds "enable" keys to the edit and insert configs for variables to maintain
the ability to selectively enable either one. They both default to true.

- the activeInRanges config for variables has been removed (this was a 
mistake in the docs)

- the "defaultEndpoint" option for the variable plugin has been renamed to
"codelistEndpoint" to better reflect it only matters for codelists
