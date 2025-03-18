import type { SayController } from '@lblod/ember-rdfa-editor';
import type { ResolvedPNode } from '@lblod/ember-rdfa-editor/utils/_private/types';
import type { EditorSetup } from '../config/setup-plugins';

export type WidgetSignature = {
  Args: {
    activeNode?: ResolvedPNode | null;
    controller: SayController;
    setup: EditorSetup;
  };
};
