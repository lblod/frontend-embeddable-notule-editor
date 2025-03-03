import type { SayController } from '@lblod/ember-rdfa-editor';
import type {
  EditorConfig,
  PluginName,
} from '../../shared-types/editor-options';

export type WidgetSignature = {
  Args: {
    controller: SayController;
    plugins: PluginName[];
    config: EditorConfig;
  };
};
