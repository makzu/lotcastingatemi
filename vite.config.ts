import { esbuildFlowPlugin, flowPlugin } from '@bunchtogether/vite-plugin-flow'
import React from '@vitejs/plugin-react-swc'
import { resolve } from 'path'
import { defineConfig } from 'vite'
import Rails from 'vite-plugin-rails'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  assetsInclude: ['**/*.md'],
  optimizeDeps: {
    esbuildOptions: {
      plugins: [esbuildFlowPlugin()],
    },
  },
  plugins: [
    flowPlugin(),
    Rails({
      fullReload: {
        additionalPaths: ['config/routes.rb', 'app/views/**/*'],
        delay: 200,
      },
    }),
    React(),
    tsconfigPaths(),
  ],
  resolve: {
    alias: {
      Docs: resolve(__dirname, 'docs'),
    },
  },
})
