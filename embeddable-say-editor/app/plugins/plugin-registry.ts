import type { CitationPluginEmberComponentConfig } from '@lblod/ember-rdfa-editor-lblod-plugins/plugins/citation-plugin';
import type FormattingToggle from '@lblod/ember-rdfa-editor/components/plugins/formatting/formatting-toggle';
import type {
  articleStructurePlugin,
  insert,
} from './definitions/article-structure.gts';
import type {
  besluitTopic,
  BesluitTopicConfig,
  besluitTopicWidget,
} from './definitions/besluit-topic.gts';
import type {
  articleInsert,
  besluitPlugin,
  BesluitPluginConfig,
} from './definitions/besluit.gts';
import type {
  citationEdit,
  citationInsert,
  setupCitationPlugin,
} from './definitions/citation.gts';
import type { confidentialityPlugin } from './definitions/confidentiality';
import type { setupEditableRdfaPlugin } from './definitions/editable-rdfa';
import type { setupFormattingToggle } from './definitions/formatting-toggle';
import type { setupHtmlEdit } from './definitions/html-edit.gts';
import type HTMLEditorMenu from '@lblod/ember-rdfa-editor/components/plugins/html-editor/menu';
import type { setupHtmlPreview } from './definitions/html-preview';
import type HTMLPreviewMenu from '../components/html-preview/menu.gts';
import type { ImagePluginConfig, setupImagePlugin } from './definitions/image';
import type { setupLinkPlugin } from './definitions/link';
import type {
  LocationConfig,
  locationInsert,
  setupLocationPlugin,
} from './definitions/location.gts';
import type {
  LpdcConfig,
  lpdcInsert,
  setupLpdcPlugin,
} from './definitions/lpdc.gts';
import type { RoadsignRegulationPluginOptions } from '@lblod/ember-rdfa-editor-lblod-plugins/plugins/roadsign-regulation-plugin';
import type {
  roadsignInsert,
  setupRoadsignRegulationPlugin,
} from './definitions/roadsign-regulation.gts';
import type { setupTableOfContentsPlugin } from './definitions/table-of-contents';
import type TOCToggle from '@lblod/ember-rdfa-editor-lblod-plugins/components/table-of-contents-plugin/toolbar-button';
import type { TableConfig, tableSetup } from './definitions/table';
import type { setupTemplateCommentsPlugin } from './definitions/template-comments';
import type TemplateCommentEditCard from '@lblod/ember-rdfa-editor-lblod-plugins/components/template-comments-plugin/edit-card';
import type TemplateCommentInsert from '@lblod/ember-rdfa-editor-lblod-plugins/components/template-comments-plugin/insert';
import type {
  setupVariablePlugin,
  variableEdit,
  variableInsert,
  VariablePluginConfig,
} from './definitions/variable.gts';
import type { coreSetup } from './definitions/core/core';

export interface EmbeddedPlugins {
  articleStructure: typeof articleStructurePlugin;
  besluitTopic: typeof besluitTopic;
  besluit: typeof besluitPlugin;
  citation: typeof setupCitationPlugin;
  confidentiality: typeof confidentialityPlugin;
  core: typeof coreSetup;
  rdfaEditor: typeof setupEditableRdfaPlugin;
  formattingToggle: typeof setupFormattingToggle;
  htmlEdit: typeof setupHtmlEdit;
  htmlPreview: typeof setupHtmlPreview;
  image: typeof setupImagePlugin;
  link: typeof setupLinkPlugin;
  location: typeof setupLocationPlugin;
  lpdc: typeof setupLpdcPlugin;
  roadsignRegulation: typeof setupRoadsignRegulationPlugin;
  tableOfContents: typeof setupTableOfContentsPlugin;
  table: typeof tableSetup;
  templateComments: typeof setupTemplateCommentsPlugin;
  variable: typeof setupVariablePlugin;
}

export interface PluginOptions
  extends Partial<Record<keyof EmbeddedPlugins, unknown>> {
  besluitTopic?: Partial<BesluitTopicConfig>;
  besluit?: Partial<BesluitPluginConfig>;
  citation?: Partial<
    CitationPluginEmberComponentConfig & {
      /**
       * @deprecated no longer does anything
       */
      type: 'nodes' | 'ranges';
    }
  >;
  image?: Partial<ImagePluginConfig>;
  location?: Partial<LocationConfig>;
  lpdc?: Partial<LpdcConfig>;
  roadsignRegulation?: Partial<RoadsignRegulationPluginOptions>;
  table?: Partial<TableConfig>;
  variable?: Partial<VariablePluginConfig>;
}
export interface OtherOptions {
  docContent?: string;
  /**
   * @deprecated no longer does anything, use the widget configuration
   */
  ui?: { expandInsertMenu?: boolean };
}

export interface ToolbarWidgets {
  'besluit:topic': typeof besluitTopicWidget;
  formatting: typeof FormattingToggle;
  'html:edit': typeof HTMLEditorMenu;
  'html:preview': typeof HTMLPreviewMenu;
  'table-of-contents': typeof TOCToggle;
}
export interface SidebarListItemWidgets {
  'article-structure:insert': typeof insert;
  'besluit:article-insert': typeof articleInsert;
  'citation:insert': typeof citationInsert;
  'location:insert': typeof locationInsert;
  'lpdc:insert': typeof lpdcInsert;
  'roadsign-regulation:insert': typeof roadsignInsert;
  'template-comments:insert': typeof TemplateCommentInsert;
}

export interface SidebarWidgets {
  'besluit:topic': typeof besluitTopicWidget;
  'citation:edit': typeof citationEdit;
  'template-comments:edit': typeof TemplateCommentEditCard;
  'variable:insert': typeof variableInsert;
  'variable:edit': typeof variableEdit;
}
