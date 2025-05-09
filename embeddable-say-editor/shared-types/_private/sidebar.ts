import type { DevToolsWidget } from './widgets/devtools';
import type {
  ArticleStructureInsertWidget,
  BesluitArticleInsertWidget,
  BesluitTopicWidget,
  CitationEditWidget,
  CitationInsertWidget,
  LocationWidget,
  LPDCInsertWidget,
  RoadsignRegulationInsertWidget,
  StructureEditWidget,
  TemplateCommentsEditWidget,
  TemplateCommentsInsertWidget,
  VariableWidget,
} from './widgets/plugins';

export type SidebarListItemWidget =
  | BesluitArticleInsertWidget
  | LPDCInsertWidget
  | ArticleStructureInsertWidget
  | CitationInsertWidget
  | RoadsignRegulationInsertWidget
  | LocationWidget
  | TemplateCommentsInsertWidget;

export type SidebarWidget =
  | BesluitTopicWidget
  | CitationEditWidget
  | TemplateCommentsEditWidget
  | StructureEditWidget
  | VariableWidget
  | DevToolsWidget;

export type SidebarCollapsibleConfig =
  | SidebarListItemWidget[]
  | {
      title?: string;
      initiallyExpanded?: boolean;
      items: SidebarListItemWidget[];
    };
export type SidebarConfig = (SidebarWidget | SidebarCollapsibleConfig)[];
