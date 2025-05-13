import { defineConfig } from 'vite';
import { extensions, classicEmberSupport, ember } from '@embroider/vite';
import { babel } from '@rollup/plugin-babel';
import * as path from 'node:path';
const classicEmber = classicEmberSupport().filter(
  (plugin) => plugin.name !== 'embroider-content-for',
);
export default defineConfig({
  root: path.join(__dirname, 'test-app'),
  appType: 'mpa',
  plugins: [
    classicEmber,
    ember(),
    // extra plugins here
    babel({
      babelHelpers: 'runtime',
      extensions,
    }),
  ],

  build: {
    outDir: './dist',
    rollupOptions: {
      input: [
        path.resolve(__dirname, 'test-app/index.html'),
        path.resolve(__dirname, 'test-app/plugins/index.html'),
        path.resolve(__dirname, 'test-app/multiple-growing-editors/index.html'),
        path.resolve(__dirname, 'test-app/multiple-editors/index.html'),
        path.resolve(__dirname, 'test-app/cipal-plugins/index.html'),
      ],
    },
  },
});
