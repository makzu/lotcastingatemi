import React from '@vitejs/plugin-react-swc'
import { resolve } from 'path'
import { splitVendorChunkPlugin } from 'vite'
import { defineConfig } from 'vitest/config'
import Rails from 'vite-plugin-rails'
import tsconfigPaths from 'vite-tsconfig-paths'
import svgr from 'vite-plugin-svgr'

export default defineConfig({
  assetsInclude: ['**/*.md'],
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            // if (id.includes('@mui')) {
            //   return 'vendor-mui'
            // }
            // if (id.includes('react-markdown')) {
            //   return 'vendor-react-markdown'
            // }
            if (
              id.includes('react-markdown') ||
              id.includes('micromark') ||
              id.includes('property-information')
            ) {
              return 'vendor-react-markdown'
            }
            if (id.includes('react-router') || id.includes('@remix-run')) {
              return 'vendor-react-router'
            }
            if (
              id.includes('node_modules/react/') ||
              id.includes('react-dom')
            ) {
              return 'vendor-react'
            }
            // return 'vendor'
          }
        },
      },
    },
  },

  plugins: [
    Rails({
      fullReload: {
        additionalPaths: ['config/routes.rb', 'app/views/**/*'],
        delay: 200,
      },
    }),
    React(),
    splitVendorChunkPlugin(),
    svgr(),
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
    includeSource: ['app/frontend/**/*.ts'],
  },
  define: {
    'import.meta.vitest': undefined,
  },
})
