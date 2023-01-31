import { esbuildFlowPlugin, flowPlugin } from '@bunchtogether/vite-plugin-flow'
import React from '@vitejs/plugin-react'
import { resolve } from 'path'
import { defineConfig } from 'vite'
import FullReload from 'vite-plugin-full-reload'
import Rails from 'vite-plugin-rails'
import tsconfigPaths from 'vite-tsconfig-paths'
import inject from '@rollup/plugin-inject'

export default defineConfig({
  assetsInclude: ['**/*.md'],
  build: {
    rollupOptions: {
      plugins: [
        inject({
          process: 'process',
        }),
      ],
    },
  },
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
      Locales: resolve(__dirname, 'locales'),
    },
  },
})
