import { esbuildFlowPlugin, flowPlugin } from '@bunchtogether/vite-plugin-flow'
import React from '@vitejs/plugin-react-swc'
import { resolve } from 'path'
import { defineConfig } from 'vitest/config'
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
      '@': resolve(__dirname, 'app/javascript/lca'),
      Docs: resolve(__dirname, 'docs'),
      components: resolve(__dirname, 'app/javascript/lca/components'),
      containers: resolve(__dirname, 'app/javascript/lca/containers'),
      ducks: resolve(__dirname, 'app/javascript/lca/ducks'),
      icons: resolve(__dirname, 'app/javascript/lca/icons'),
      selectors: resolve(__dirname, 'app/javascript/lca/selectors'),
      styles: resolve(__dirname, 'app/javascript/lca/styles'),
      utils: resolve(__dirname, 'app/javascript/lca/utils'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['testSetup.ts'],
    exclude: ['**/__test__/**'],
  },
})
