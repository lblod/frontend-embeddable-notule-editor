import { helper } from '@ember/component/helper';

const INSERT_SECTION_PLUGINS = [
  'citation',
  'roadsign-regulation',
  'template-comments',
  'location',
];
const DECISION_SECTION_PLUGINS = ['besluit', 'lpdc'];
const PLUGIN_SECTIONS = {
  sidebar: [
    ...INSERT_SECTION_PLUGINS,
    ...DECISION_SECTION_PLUGINS,
    'variable',
    'rdfa-editor',
    'article-structure',
  ],
  insert: INSERT_SECTION_PLUGINS,
  decision: DECISION_SECTION_PLUGINS,
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
