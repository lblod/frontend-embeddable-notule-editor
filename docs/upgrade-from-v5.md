# V6 upgrade guide

## ⚠️Breaking changes ⚠️

### LPDC plugin

The `endpoint` configuration of the lpdc plugin **now expects the full URL**.
Previously, the plugin added `/doc/instantie` to the url passed in for the
`endpoint`. This was a bit silly as it needlessly limited the way you could
configure your proxy, and more importantly, it blocked the useage of the
`/doc/concept` endpoint.

So if you had a config like this:

```ts
const editor = await renderEditor({
  plugins: [, /*...*/ "lpdc"],
  options: {
    lpdc: {
      endpoint: "https://some.endpoint.be/lpdc",
    },
  },
  /*...*/
});
```

You should update this to:

```ts
const editor = await renderEditor({
  plugins: [, /*...*/ "lpdc"],
  options: {
    lpdc: {
      endpoint: "https://some.endpoint.be/lpdc/doc/instantie",
    },
  },
  /*...*/
});
```

As mentioned, this now allows the usage of lpdc `concepts` instead of
`instances` by simply changing the URL. The plugin works with both
`/doc/instantie` and `/doc/concept` endpoints.

### Css clashes/changes

As far as we know, the above change to the lpdc plugin config is the only
breaking change in the v6 release. But as mentioned, the way the editor
interacts with the page is completely different, so please test thoroughly.

## What's new

The new way we can ship and render opens up a number of possibilities which
you may have had to implement workarounds for in the past.

### No more iframes

We no longer need to use an iframe for rendering. Previously this was required due to the ember build being AMD, which assumes a global window namespace and does not play nice with modern bundlers.

We now ship pure ES modules, which should work as you expect with any modern
bundler.

This also means types are now shipped automatically, and extend all the way into the lowest level of the editor.

We've also noticed a significant speedup in rendering times, but your mileage
may vary.

### 2 rendering modes

With iframes gone, we have much more flexibility in how we render the editor. That being said, there were still a lot of challenges with regards to the styling, which also assumed it had complete control over a global namespace.

For that reason, we present 2 ways of rendering the editor: in a [ShadowRoot](https://developer.mozilla.org/en-US/docs/Web/API/ShadowRoot), or as a normal element (non-scoped).

A shadowroot encapsulates the css so it can't leak out into the page. The css is automatically injected into the shadowroot. This mode is the closest to the way the iframe worked, and is therefore the default.

Non-scoped is slightly experimental at the moment, as we need to review our css to have less agressive global rules.
It is the "nicest" approach in theory, as you are in full control of the styles.
It also has the added benefit of only having the styles in the page once, whereas for the shadowroot approach the css is duplicated for each editor instance (it's not that much, so not really a problem).

### Widget config

We added a new system for customizing the tool- and sidebar, including
making your own sidebar groups.

Read more [here](./widgets.md).

### Deprecations

Thanks to the more direct way of rendering, a number of special options are no
longer required. We decided to keep supporting them for the v6 release, but
deprecate them and remove them in the next release. 

These are:

`title`: this was only needed for the iframe, and makes no sense anymore. It
simply does nothing now, you can safely remove it.
`width` and `height`: You can now simply apply styles to the element you are
rendering the editor in. The options still work as before though.
`growEditor`: this used to be quite a complicated implementation because of the
limitations of iframes. Now, we get this behavior "for free" by simply not
setting a max-height (or height) on the outer element. 

When this was set to true, it changed the behavior of the height option to be a
min-height for the growing editor. You can now set a min-height directly by
using the `--say-page-minimum-height` css variable.

`options.ui.expandInsertMenu`: is replaced by the widget api and no longer does
anything


