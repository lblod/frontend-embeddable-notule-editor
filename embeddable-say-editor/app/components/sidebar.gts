import type { WidgetSignature } from '../utils/types';
import type { ComponentLike } from '@glint/template';
import type { SayController } from '@lblod/ember-rdfa-editor';
import type {
  EditorConfig,
  PluginName,
} from '../../shared-types/editor-options';

import type { TOC } from '@ember/component/template-only';
import type {
  SidebarCollapsibleConfig,
  SidebarConfig,
  SidebarListItemWidget,
  SidebarWidget,
} from '../../shared-types/_private/sidebar';
import Component from '@glimmer/component';
import { service } from '@ember/service';
import type IntlService from 'ember-intl/services/intl';
import { get } from '@ember/helper';
import RdfaEditorSidebar from '@lblod/ember-rdfa-editor/components/sidebar';
import StructureControlCard from '@lblod/ember-rdfa-editor-lblod-plugins/components/structure-plugin/control-card';
import InsertVariableCard from '@lblod/ember-rdfa-editor-lblod-plugins/components/variable-plugin/insert-variable-card';
import CodelistEdit from '@lblod/ember-rdfa-editor-lblod-plugins/components/variable-plugin/codelist/edit';
import DateEdit from '@lblod/ember-rdfa-editor-lblod-plugins/components/variable-plugin/date/edit';
import LocationEdit from '@lblod/ember-rdfa-editor-lblod-plugins/components/variable-plugin/location/edit';
import AddressEdit from '@lblod/ember-rdfa-editor-lblod-plugins/components/variable-plugin/address/edit';
import TemplateCommentEditCard from '@lblod/ember-rdfa-editor-lblod-plugins/components/template-comments-plugin/edit-card';
import CitationEditCard from '@lblod/ember-rdfa-editor-lblod-plugins/components/citation-plugin/citation-card';
import BesluitTopicDropdown from '@lblod/ember-rdfa-editor-lblod-plugins/components/besluit-topic-plugin/besluit-topic-toolbar-dropdown';
import InsertArticleComponent from '@lblod/ember-rdfa-editor-lblod-plugins/components/decision-plugin/insert-article';
import LpdcInsert from '@lblod/ember-rdfa-editor-lblod-plugins/components/lpdc-plugin/lpdc-insert';
import CitationInsert from '@lblod/ember-rdfa-editor-lblod-plugins/components/citation-plugin/citation-insert';
import RoadsignRegulationInsert from '@lblod/ember-rdfa-editor-lblod-plugins/components/roadsign-regulation-plugin/roadsign-regulation-card';
import OSLOLocationInsert from '@lblod/ember-rdfa-editor-lblod-plugins/components/location-plugin/insert';
import TemplateCommentInsert from '@lblod/ember-rdfa-editor-lblod-plugins/components/template-comments-plugin/insert';
import ArticleStructureInsert from '@lblod/ember-rdfa-editor-lblod-plugins/components/article-structure-plugin/article-structure-card';

import DebugInfo from '@lblod/ember-rdfa-editor/components/_private/debug-info';
import type { ResolvedPNode } from '@lblod/ember-rdfa-editor/utils/_private/types';
import AttributeEditor from '@lblod/ember-rdfa-editor/components/_private/attribute-editor';
import RdfaEditor from '@lblod/ember-rdfa-editor/components/_private/rdfa-editor';

type ToolbarWidgetComponent = ComponentLike<WidgetSignature>;

const SIDEBAR_WIDGET_MAP: Record<SidebarWidget, ToolbarWidgetComponent> = {
  'besluit:topic': <template>
    <BesluitTopicDropdown
      @controller={{@controller}}
      {{! @glint-expect-error }}
      @options={{@config.besluitTopic}}
    />
  </template> as TOC<WidgetSignature>,
  'structure:edit': StructureControlCard,
  'variable:insert': <template>
    <InsertVariableCard
      @controller={{@controller}}
      {{! @glint-expect-error }}
      @variableTypes={{@config.variable.insert.variableTypes}}
    />
  </template> as TOC<WidgetSignature>,
  'variable:edit': <template>
    <CodelistEdit
      @controller={{@controller}}
      {{! @glint-expect-error }}
      @options={{@config.variable.edit.codelist}}
    />
    <DateEdit
      @controller={{@controller}}
      {{! @glint-expect-error }}
      @options={{@config.variable.edit.date}}
    />
    <LocationEdit
      @controller={{@controller}}
      {{! @glint-expect-error }}
      @options={{@config.variable.edit.location}}
    />
    <AddressEdit
      @controller={{@controller}}
      {{! @glint-expect-error }}
      @defaultMunicipality={{@config.variable.edit.address.defaultMunicipality}}
    />
  </template> as TOC<WidgetSignature>,
  'template-comments:edit': TemplateCommentEditCard,
  'citation:edit': <template>
    <CitationEditCard
      @controller={{@controller}}
      {{! @glint-expect-error }}
      @config={{@config.citation}}
    />
  </template> as TOC<WidgetSignature>,
  'devtools:debug-info': <template>
    <DebugInfo @node={{@activeNode}} />
  </template> as TOC<WidgetSignature>,
  'devtools:attribute-editor': <template>
    <AttributeEditor @node={{@activeNode}} @controller={{@controller}} />
  </template> as TOC<WidgetSignature>,
  'devtools:rdfa-editor': <template>
    <RdfaEditor @node={{@activeNode}} @controller={{@controller}} />
  </template> as TOC<WidgetSignature>,
} as const;

const SIDEBAR_LIST_ITEM_WIDGET_MAP: Record<
  SidebarListItemWidget,
  ToolbarWidgetComponent
> = {
  'besluit:article-insert': <template>
    <InsertArticleComponent
      @controller={{@controller}}
      {{! @glint-expect-error }}
      @options={{@config.besluit}}
    />
  </template> as TOC<WidgetSignature>,
  'lpdc:insert': <template>
    <LpdcInsert
      @controller={{@controller}}
      {{! @glint-expect-error }}
      @config={{@config.lpdc}}
    />
  </template> as TOC<WidgetSignature>,
  'article-structure:insert': <template>
    <ArticleStructureInsert
      @controller={{@controller}}
      {{! @glint-expect-error }}
      @options={{@config.structures}}
    />
  </template> as TOC<WidgetSignature>,
  'citation:insert': <template>
    <CitationInsert
      @controller={{@controller}}
      {{! @glint-expect-error }}
      @config={{@config.citation}}
    />
  </template> as TOC<WidgetSignature>,
  'roadsign-regulation:insert': <template>
    <RoadsignRegulationInsert
      @controller={{@controller}}
      {{! @glint-expect-error }}
      @options={{@config.roadsignRegulation}}
    />
  </template> as TOC<WidgetSignature>,
  'location:insert': <template>
    <OSLOLocationInsert
      @controller={{@controller}}
      {{! @glint-expect-error }}
      @config={{@config.location}}
      {{! @glint-expect-error }}
      @defaultMunicipality={{@config.location.defaultMunicipality}}
      {{! @glint-expect-error }}
      @locationTypes={{@config.location.locationTypes}}
    />
  </template> as TOC<WidgetSignature>,
  'template-comments:insert': TemplateCommentInsert,
};

type SidebarSignature = {
  activeNode: ResolvedPNode;
  controller: SayController;
  sidebar: SidebarConfig;
  config: EditorConfig;
  plugins: PluginName[];
};

export default class Sidebar extends Component<SidebarSignature> {
  @service declare intl: IntlService;

  isCollapsibleContainer = (
    sidebarEntry: SidebarWidget | SidebarCollapsibleConfig,
  ): sidebarEntry is SidebarCollapsibleConfig => {
    return typeof sidebarEntry === 'object';
  };

  title = (sidebarCollapsible: SidebarCollapsibleConfig) => {
    const defaulttitle = this.intl.t('editor.insert');
    if (Array.isArray(sidebarCollapsible)) {
      return defaulttitle;
    } else {
      return sidebarCollapsible.title ?? defaulttitle;
    }
  };

  initiallyExpanded = (sidebarCollapsible: SidebarCollapsibleConfig) => {
    if (Array.isArray(sidebarCollapsible)) {
      return true;
    } else {
      return sidebarCollapsible.initallyExpanded ?? true;
    }
  };

  widgets = (sidebarCollapsible: SidebarCollapsibleConfig) => {
    if (Array.isArray(sidebarCollapsible)) {
      return sidebarCollapsible;
    } else {
      return sidebarCollapsible.items;
    }
  };

  <template>
    <RdfaEditorSidebar as |Sb|>
      {{#each @sidebar as |sidebarEntry|}}
        {{#if (this.isCollapsibleContainer sidebarEntry)}}
          {{! @glint-expect-error }}
          <Sb.Collapsible
            @title={{this.title sidebarEntry}}
            @expandedInitially={{this.initiallyExpanded sidebarEntry}}
          >
            {{#each (this.widgets sidebarEntry) as |listItemWidget|}}
              {{#let
                (get SIDEBAR_LIST_ITEM_WIDGET_MAP listItemWidget)
                as |ListItemWidgetComponent|
              }}
                <ListItemWidgetComponent
                  @activeNode={{@activeNode}}
                  @controller={{@controller}}
                  @plugins={{@plugins}}
                  @config={{@config}}
                />
              {{/let}}
            {{/each}}
          </Sb.Collapsible>
        {{else}}
          {{#let
            (get SIDEBAR_WIDGET_MAP sidebarEntry)
            as |SidebarWidgetComponent|
          }}
            <SidebarWidgetComponent
              @activeNode={{@activeNode}}
              @controller={{@controller}}
              @plugins={{@plugins}}
              @config={{@config}}
            />
          {{/let}}
        {{/if}}
      {{/each}}
    </RdfaEditorSidebar>
  </template>
}
