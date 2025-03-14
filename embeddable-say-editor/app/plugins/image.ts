import {
  checkPasteSize,
  imageView,
  imageWithConfig,
} from '@lblod/ember-rdfa-editor/plugins/image';
import type { PluginInitializer } from '../../shared-types/editor-options';
export type ImagePluginConfig = {
  allowBase64Images: boolean;
  pasteLimit: number;
  onLimitReached: () => void;
};

export const setupImagePlugin: PluginInitializer<ImagePluginConfig> = (
  _setup,
  config,
) => {
  const nodes = {
    image: imageWithConfig({
      allowBase64Images: config.allowBase64Images,
    }),
  };
  return {
    name: 'image',
    config,
    nodes,
    nodeViews: { image: imageView },
    prosePlugins: config.allowBase64Images
      ? [
          checkPasteSize({
            pasteLimit: config.pasteLimit,
            onLimitReached: config.onLimitReached,
          }),
        ]
      : [],
  };
};
