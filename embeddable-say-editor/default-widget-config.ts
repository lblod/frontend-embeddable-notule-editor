import type { InternalPluginName } from './shared-types/editor-options';

export function defaultToolbarConfig(activePlugins: InternalPluginName[]) {
  const plugins = activePlugins ?? [];
  const mainSection = [];
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
  const HTMLWidgets = [];
  if (plugins.includes('html-edit')) {
    HTMLWidgets.push('html:edit');
  }
  if (plugins.includes('html-preview')) {
    HTMLWidgets.push('html:preview');
  }
  if (HTMLWidgets.length) {
    mainSection.push(HTMLWidgets);
  }

  const group = [];
  if (plugins.includes('table-of-contents')) {
    group.push('table-of-contents');
  }
  if (plugins.includes('formatting-toggle')) {
    group.push('formatting');
  }
  if (
    plugins.includes('besluit-topic') &&
    this.config.besluitTopic.widgetLocation === 'toolbar'
  ) {
    group.push('besluit:topic');
  }
  const sideSection = group.length ? [group] : undefined;
  return {
    main: mainSection,
    side: sideSection,
  };
}
export function defaultSidebarConfig(activePlugins: InternalPluginName[]) {
  const plugins = activePlugins ?? [];
  const sidebar = [];
  if (
    plugins.includes('besluit-topic') &&
    this.config.besluitTopic.widgetLocation === 'sidebar'
  ) {
    sidebar.push('besluit:topic');
  }
  const insertContainer = [];
  if (plugins.includes('besluit')) {
    insertContainer.push('besluit:article-insert');
  }
  if (plugins.includes('lpdc')) {
    insertContainer.push('lpdc:insert');
  }
  if (plugins.includes('article-structure')) {
    insertContainer.push('article-structure:insert');
  }
  if (plugins.includes('citation')) {
    insertContainer.push('citation:insert');
  }
  if (plugins.includes('roadsign-regulation')) {
    insertContainer.push('roadsign-regulation:insert');
  }
  if (plugins.includes('location')) {
    insertContainer.push('location:insert');
  }
  if (plugins.includes('template-comments')) {
    insertContainer.push('template-comments:insert');
  }
  if (insertContainer.length) {
    sidebar.push(insertContainer);
  }
  if (plugins.includes('article-structure') || plugins.includes('besluit')) {
    sidebar.push('structure:edit');
  }
  if (plugins.includes('variable')) {
    sidebar.push('variable:insert');
    sidebar.push('variable:edit');
  }
  if (plugins.includes('template-comments')) {
    sidebar.push('template-comments:edit');
  }
  if (plugins.includes('citation')) {
    sidebar.push('citation:edit');
  }
  if (plugins.includes('rdfa-editor')) {
    sidebar.push(
      'devtools:rdfa-editor',
      'devtools:attribute-editor',
      'devtools:debug-info',
    );
  }
  return sidebar;
}
export function defaultWidgetConfig(activePlugins: InternalPluginName[]) {
  return {
    toolbar: defaultToolbarConfig(activePlugins),
    sidebar: defaultSidebarConfig(activePlugins),
  };
}
