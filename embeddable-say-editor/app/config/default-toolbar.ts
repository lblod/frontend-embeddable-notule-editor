import type { PluginInitArgs } from '../../shared-types/embedded-plugin';
import type {
  ToolbarConfig,
  ToolbarGroupConfig,
  ToolbarSection,
} from '../../shared-types/widgets';

export function defaultToolbar({
  plugins = [],
  options,
}: PluginInitArgs): ToolbarConfig {
  const mainSection: ToolbarSection = [];
  mainSection.push(
    ['undo', 'redo'],
    [
      'bold',
      'italic',
      'strikethrough',
      'underline',
      'subscript',
      'superscript',
      'highlight',
      'color',
    ],
    ['list:bullet', 'list:numbered', 'indentation'],
    ['hyperlink', 'image'],
    ['table'],
    ['heading'],
    ['alignment'],
  );
  const HTMLWidgets: ToolbarGroupConfig = [];
  if (plugins.includes('html-edit')) {
    HTMLWidgets.push('html:edit');
  }
  if (plugins.includes('html-preview')) {
    HTMLWidgets.push('html:preview');
  }
  if (HTMLWidgets.length) {
    mainSection.push(HTMLWidgets);
  }

  const group: ToolbarGroupConfig = [];
  if (plugins.includes('table-of-contents')) {
    group.push('table-of-contents');
  }
  if (plugins.includes('formatting-toggle')) {
    group.push('formatting');
  }
  if (
    plugins.includes('besluit-topic') &&
    options?.['besluit-topic']?.widgetLocation === 'toolbar'
  ) {
    group.push('besluit:topic');
  }
  const sideSection: ToolbarSection = group.length ? [group] : [[]];
  return {
    main: mainSection,
    side: sideSection,
  };
}
