import ResponsiveToolbar from '@lblod/ember-rdfa-editor/components/responsive-toolbar';

import Component from '@glimmer/component';
import type { SayController } from '@lblod/ember-rdfa-editor';

import { get } from '@ember/helper';
import type { TOC } from '@ember/component/template-only';
import type { ResolvedPNode } from '@lblod/ember-rdfa-editor/utils/_private/types';
import type { EditorSetup } from '../plugins/setup/setup-plugins.ts';
import type { ToolbarConfig, ToolbarGroupConfig } from '../plugins/widgets';
import { hash } from '@ember/helper';
import { ContainerQuery, width } from 'ember-container-query';

type ToolbarSignature = {
  Args: {
    activeNode?: ResolvedPNode | null;
    controller: SayController;
    toolbar: ToolbarConfig;
    setup: EditorSetup;
  };
};

export default class Toolbar extends Component<ToolbarSignature> {
  get responsiveWidth() {
    return this.args.toolbar.responsiveWidth ?? 800;
  }
  <template>
    <ContainerQuery
      @features={{hash large=(width min=this.responsiveWidth)}}
      as |CQ|
    >
      <ResponsiveToolbar>

        {{! @glint-expect-error }}
        <:main as |Tb|>
          {{#each @toolbar.main as |toolbarGroup|}}
            <Tb.Group>
              <ToolbarGroup
                @activeNode={{@activeNode}}
                @controller={{@controller}}
                @toolbarGroup={{toolbarGroup}}
                @setup={{@setup}}
                @cq={{CQ}}
              />
            </Tb.Group>
          {{/each}}
        </:main>
        {{! @glint-expect-error }}
        <:side as |Tb|>
          {{#each @toolbar.side as |toolbarGroup|}}
            <Tb.Group>
              <ToolbarGroup
                @activeNode={{@activeNode}}
                @controller={{@controller}}
                @toolbarGroup={{toolbarGroup}}
                @setup={{@setup}}
                @cq={{CQ}}
              />
            </Tb.Group>
          {{/each}}
        </:side>

      </ResponsiveToolbar>
    </ContainerQuery>
  </template>
}

type ToolbarGroupSignature = {
  activeNode?: ResolvedPNode | null;
  controller: SayController;
  toolbarGroup: ToolbarGroupConfig;
  setup: EditorSetup;
};
class ToolbarGroup extends Component<ToolbarGroupSignature> {
  get widgets() {
    console.log(this.args.cq);
    if (Array.isArray(this.args.toolbarGroup)) {
      return this.args.toolbarGroup;
    } else {
      return this.args.toolbarGroup.items;
    }
  }
  <template>
    {{#each this.widgets as |widget|}}
      {{#if widget.type}}
        {{#let
          (get @setup.widgetMaps.toolbar widget.type)
          as |WidgetComponent|
        }}
          <WidgetComponent
            @activeNode={{@activeNode}}
            @setup={{@setup}}
            @controller={{@controller}}
            @children={{widget.children}}
            @attributes={{widget.attributes}}
            @toolbarWidgets={{@setup.widgetMaps.toolbar}}
            @icons={{@setup.iconMap}}
            @cq={{@cq}}
          />
        {{/let}}
      {{else}}
        {{#let (get @setup.widgetMaps.toolbar widget) as |WidgetComponent|}}
          <WidgetComponent
            @activeNode={{@activeNode}}
            @setup={{@setup}}
            @controller={{@controller}}
            @cq={{@cq}}
          />
        {{/let}}
      {{/if}}
    {{/each}}
  </template>
}
