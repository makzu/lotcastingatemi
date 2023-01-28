import { esbuildFlowPlugin, flowPlugin } from '@bunchtogether/vite-plugin-flow'
import React from '@vitejs/plugin-react'
import { resolve } from 'path'
import { defineConfig } from 'vite'
import FullReload from 'vite-plugin-full-reload'
import RubyPlugin from 'vite-plugin-ruby'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  assetsInclude: ['**/*.md'],
  optimizeDeps: {
    esbuildOptions: {
      plugins: [esbuildFlowPlugin()]
    }
  },
  plugins: [
    flowPlugin(),
    FullReload(['config/routes.rb', 'app/views/**/*'], { delay: 200 }),
    React(),
    RubyPlugin(),
    tsconfigPaths(),
  ],
  resolve: {
    alias: {
      Docs: resolve(__dirname, 'docs'),
      Locales: resolve(__dirname, 'locales'),
    }
  }
})
