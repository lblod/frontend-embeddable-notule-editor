import type { SayController } from '@lblod/ember-rdfa-editor';

import Component from '@glimmer/component';
import { service } from '@ember/service';
import type IntlService from 'ember-intl/services/intl';
import { get } from '@ember/helper';
import RdfaEditorSidebar from '@lblod/ember-rdfa-editor/components/sidebar';

import type { ResolvedPNode } from '@lblod/ember-rdfa-editor/utils/_private/types';
import type { EditorSetup } from '../setup/setup-plugins';
import type {
  SidebarCollapsibleConfig,
  SidebarConfig,
  SidebarWidgetName,
} from '../../shared-types/widgets';

type SidebarSignature = {
  activeNode?: ResolvedPNode | null;
  controller: SayController;
  sidebar: SidebarConfig;
  setup: EditorSetup;
};

export default class Sidebar extends Component<SidebarSignature> {
  @service declare intl: IntlService;

  isCollapsibleContainer = (
    sidebarEntry: SidebarWidgetName | SidebarCollapsibleConfig,
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
                (get @setup.widgetMaps.sidebar listItemWidget)
                as |ListItemWidgetComponent|
              }}
                <ListItemWidgetComponent
                  @activeNode={{@activeNode}}
                  @controller={{@controller}}
                  @setup={{@setup}}
                />
              {{/let}}
            {{/each}}
          </Sb.Collapsible>
        {{else}}
          {{#let
            (get @setup.widgetMaps.sidebar sidebarEntry)
            as |SidebarWidgetComponent|
          }}
            <SidebarWidgetComponent
              @activeNode={{@activeNode}}
              @controller={{@controller}}
              @setup={{@setup}}
            />
          {{/let}}
        {{/if}}
      {{/each}}
    </RdfaEditorSidebar>
  </template>
}
