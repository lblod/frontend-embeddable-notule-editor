import type {
  AlignmentWidget,
  FormattingWidget,
  HeadingWidget,
  HistoryWidget,
  HyperlinkWidget,
  ImageWidget,
  IndentationWidget,
  ListWidget,
  StylingWidget,
  TableWidget,
} from './widgets/common';
import type {
  BesluitTopicWidget,
  HTMLWidget,
  TableOfContentsWidget,
} from './widgets/plugins';

export type ToolbarWidget =
  | HistoryWidget
  | StylingWidget
  | IndentationWidget
  | HeadingWidget
  | ListWidget
  | AlignmentWidget
  | HyperlinkWidget
  | ImageWidget
  | TableWidget
  | FormattingWidget
  | HTMLWidget
  | TableOfContentsWidget
  | BesluitTopicWidget;

export type ToolbarGroupConfig =
  | ToolbarWidget[]
  | {
      items: ToolbarWidget[];
    };

type ToolbarSection = ToolbarGroupConfig[];

export type ToolbarConfig = {
  main?: ToolbarSection;
  side?: ToolbarSection;
};
