import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import { extensions, classicEmberSupport, ember } from '@embroider/vite';
import { babel } from '@rollup/plugin-babel';

const __dirname = dirname(fileURLToPath(import.meta.url));
// we explicitly don't want contentFor, as that's what rewrites the index.html of our test-app, which
// a consuming app obviously won't ever do
const classicEmber = classicEmberSupport().filter(
  (plugin) => plugin.name !== 'embroider-content-for',
);
export default defineConfig({
  appType: 'mpa',
  build: {
    lib: {
      entry: resolve(__dirname, 'app/main.ts'),
      name: 'embeddable-say-editor',
      fileName: 'embeddable-say-editor',
    },
    rollupOptions: {
      input: 'app/main.ts',
    },
  },
  plugins: [
    classicEmber,
    ember(),
    // extra plugins here
    babel({
      babelHelpers: 'runtime',
      extensions,
    }),
  ],
});
