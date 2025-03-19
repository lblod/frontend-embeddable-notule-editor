import type { SayController } from '@lblod/ember-rdfa-editor';
import type { ResolvedPNode } from '@lblod/ember-rdfa-editor/utils/_private/types';
import type { EditorSetup } from '../app/config/setup-plugins';
import type {
  ToolbarWidgets,
  SidebarWidgets,
  SidebarListItemWidgets,
} from 'plugin-registry';
import type { ComponentLike } from '@glint/template';
import type { PluginName } from './embedded-plugin';

export type WidgetSignature<N extends PluginName | void = void> = {
  Args: {
    activeNode?: ResolvedPNode | null;
    controller: SayController;
    setup: EditorSetup<N>;
  };
};
export type WidgetComponent = ComponentLike<WidgetSignature>;
export type ToolbarWidgetName = keyof ToolbarWidgets;

export type ToolbarGroupConfig =
  | ToolbarWidgetName[]
  | {
      items: ToolbarWidgetName[];
    };

export type ToolbarSection = ToolbarGroupConfig[];

export type ToolbarConfig = {
  main?: ToolbarSection;
  side?: ToolbarSection;
};

export type SidebarWidgetName = keyof SidebarWidgets;
export type SidebarListItemWidgetName = keyof SidebarListItemWidgets;
export type SidebarCollapsibleConfig =
  | SidebarListItemWidgetName[]
  | {
      title?: string;
      initallyExpanded?: boolean;
      items: SidebarListItemWidgetName[];
    };
export type SidebarConfig = (SidebarWidgetName | SidebarCollapsibleConfig)[];
