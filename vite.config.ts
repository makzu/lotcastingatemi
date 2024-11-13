import { resolve } from 'node:path'
import React from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'
import Rails from 'vite-plugin-rails'
import svgr from 'vite-plugin-svgr'
import tsconfigPaths from 'vite-tsconfig-paths'
import { coverageConfigDefaults } from 'vitest/config'

export default defineConfig({
  assetsInclude: ['**/*.md'],

  plugins: [
    Rails({
      fullReload: {
        additionalPaths: ['config/routes.rb', 'app/views/**/*'],
        delay: 200,
      },
    }),
    React(),
    svgr(),
    tsconfigPaths(),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'app/javascript/lca'),
      Docs: resolve(__dirname, 'docs'),
      // components: resolve(__dirname, 'app/javascript/lca/components'),
      // containers: resolve(__dirname, 'app/javascript/lca/containers'),
      // ducks: resolve(__dirname, 'app/javascript/lca/ducks'),
      // icons: resolve(__dirname, 'app/javascript/lca/icons'),
      // selectors: resolve(__dirname, 'app/javascript/lca/selectors'),
      // styles: resolve(__dirname, 'app/javascript/lca/styles'),
      // utils: resolve(__dirname, 'app/javascript/lca/utils'),
    },
  },
  // @ts-expect-error - vitest config
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['testSetup.ts'],
    exclude: ['**/__test__/**'],
    includeSource: ['app/javascript/lca/**/*.(ts|tsx)'],
    coverage: {
      provider: 'v8',
      exclude: ['**/__test__/**', ...coverageConfigDefaults.exclude],
      reportsDirectory: '../../../coverage-frontend',
    },
  },
  // define: {
  //   'import.meta.vitest': undefined,
  // },
})
