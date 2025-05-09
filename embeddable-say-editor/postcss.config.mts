import { Plugin } from 'postcss';
import remToPx from '@thedutchcoder/postcss-rem-to-px';

const selectorMapping = {
  ':root': ':host',
  html: ':host',
  body: '.ember-application',
};
const embeddablePlugin: Plugin = {
  postcssPlugin: 'postcss-embeddable',
  prepare(result) {
    const fileName = result.opts.from;
    // for all files, remap the media rules to use container instead
    // of the window width. Even with non-shadowed css we prefer to match based
    // on container size, since that's what matters when the editor is not
    // full-page width
    const processors: ReturnType<Required<Plugin>['prepare']> = {
      AtRule: {
        media: (atRule) => {
          atRule.name = 'container say-editor';
        },
      },
    };
    // for the shadowed version, also remap the top-level selectors
    if (fileName && fileName.includes('app-shadowed.scss')) {
      return {
        ...processors,
        Rule: (rule) => {
          rule.selectors = rule.selectors.map((selector) => {
            return selectorMapping[selector] ?? selector;
          });
        },
      };
    }
    return processors;
  },
};

// ctx has at least .env and .cwd, should we ever need those
const config = (_ctx: unknown) => {
  return {
    plugins: [remToPx({ baseValue: 10 }), embeddablePlugin],
  };
};
export default config;
