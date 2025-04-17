import { Plugin } from 'postcss';
import remToPx from '@thedutchcoder/postcss-rem-to-px';

const selectorMapping = {
  ':root': ':host',
  html: ':host',
  body: '.ember-application',
};
const embeddablePlugin: Plugin = {
  postcssPlugin: 'postcss-embeddable',
  AtRule: {
    media: (atRule) => {
      atRule.name = 'container say-editor';
    },
  },
  Rule: (rule) => {
    rule.selectors = rule.selectors.map((selector) => {
      return selectorMapping[selector] ?? selector;
    });
  },
};

const config = {
  plugins: [remToPx({ baseValue: 10 }), embeddablePlugin],
};
export default config;
