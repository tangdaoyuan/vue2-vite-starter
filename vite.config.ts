/* eslint-disable @typescript-eslint/ban-ts-comment */
import { fileURLToPath } from 'url';

import { defineConfig, loadEnv } from 'vite';
import type { ServerOptions } from 'vite';
import legacy from '@vitejs/plugin-legacy';
import { createVuePlugin as vue2 } from 'vite-plugin-vue2';
// @ts-ignore
import vueTemplateBabelCompiler from 'vue-template-babel-compiler';
import scriptSetup from 'unplugin-vue2-script-setup/vite';
import Inspect from 'vite-plugin-inspect';
import { viteMockServe } from 'vite-plugin-mock';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  let server: ServerOptions | undefined = undefined;

  const plugins = [
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
    Inspect()
  ];

  if (mode === 'mock') {
    // 本地mock
    plugins.push(
      viteMockServe({
        // default
        mockPath: 'mock',
        localEnabled: command === 'serve'
      })
    );
  } else {
    let ENV: any = {};
    try {
      ENV = loadEnv(mode, process.cwd());
    } catch (error) {
      console.error(error);
    }
    server = {
      host: '0.0.0.0',
      open: true,
      port: 3000,
      https: false,
      proxy: {
        '/api': {
          target: ENV.VITE_APP_BASE_API || '',
          changeOrigin: true,
          rewrite: path => path.replace(/^\/api/, '/api'),
          secure: false
        }
      }
    };
  }

  return {
    server,
    css: {
      preprocessorOptions: {
        scss: { charset: false }
      }
    },
    plugins,
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    optimizeDeps: {
      exclude: ['vue-demi']
    }
  };
});
