import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import { extensions, classicEmberSupport, ember } from '@embroider/vite';
import { babel } from '@rollup/plugin-babel';

const __dirname = dirname(fileURLToPath(import.meta.url));
export default defineConfig({

  build: {
    lib: {
      entry: resolve(__dirname, 'main.ts'),
      name: 'embeddable-say-editor',
      fileName: 'embeddable-say-editor',
    },
    rollupOptions: {
      input: 'main.ts',
    },
  },
  plugins: [
    classicEmberSupport(),
    ember(),
    // extra plugins here
    babel({
      babelHelpers: 'runtime',
      extensions,
    }),
  ],
});
