import type { SayController } from '@lblod/ember-rdfa-editor';
import type {
  EditorConfig,
  PluginName,
} from '../../shared-types/editor-options';
import type { ResolvedPNode } from '@lblod/ember-rdfa-editor/utils/_private/types';

export type WidgetSignature = {
  Args: {
    activeNode: ResolvedPNode;
    controller: SayController;
    plugins: PluginName[];
    config: EditorConfig;
  };
};
