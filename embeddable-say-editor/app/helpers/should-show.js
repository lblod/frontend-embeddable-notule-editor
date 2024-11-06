import { helper } from '@ember/component/helper';

const INSERT_SECTION_PLUGINS = [
  'citation',
  'article-structure',
  'besluit',
  'lpdc',
  'roadsign-regulation',
  'template-comments',
  'location',
];
const PLUGIN_SECTIONS = {
  sidebar: [...INSERT_SECTION_PLUGINS, 'variable', 'rdfa-editor'],
  insert: INSERT_SECTION_PLUGINS,
  decision: ['besluit', 'lpdc'],
  html: ['html-edit', 'html-preview'],
};

export default helper(function shouldShow(
  pluginNameArg,
  { active = [], section }
) {
  if (section) {
    return PLUGIN_SECTIONS[section].some((plugin) => active.includes(plugin));
  }
  return active.includes(pluginNameArg[0]);
});
