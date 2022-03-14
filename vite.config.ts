/* eslint-disable @typescript-eslint/ban-ts-comment */
import { fileURLToPath } from 'url';

import { defineConfig } from 'vite';
import legacy from '@vitejs/plugin-legacy';
import { createVuePlugin as vue2 } from 'vite-plugin-vue2';
// @ts-ignore
import vueTemplateBabelCompiler from 'vue-template-babel-compiler';
import scriptSetup from 'unplugin-vue2-script-setup/vite';
import { viteMockServe } from 'vite-plugin-mock';

// https://vitejs.dev/config/
export default defineConfig(({ command }) => ({
  css: {
    preprocessorOptions: {
      scss: { charset: false }
    }
  },
  plugins: [
    vue2({
      jsx: true,
      vueTemplateOptions: {
        compiler: vueTemplateBabelCompiler
      }
    }),
    scriptSetup(),
    legacy({
      targets: ['ie >= 11'],
      additionalLegacyPolyfills: ['regenerator-runtime/runtime']
    }),
    viteMockServe({
      // default
      mockPath: 'mock',
      localEnabled: command === 'serve'
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  optimizeDeps: {
    exclude: ['vue-demi']
  }
}));
