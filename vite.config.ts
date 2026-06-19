import { resolve } from 'node:path'

// @ts-expect-error "This won't have defs"
import { flowPlugin } from '@bunchtogether/vite-plugin-flow'
import transformImports from '@rolldown/plugin-transform-imports'
import React from '@vitejs/plugin-react'
import Rails from 'vite-plugin-rails'
import { defineConfig } from 'vitest/config'

export default defineConfig(({ command }) => ({
  assetsInclude: ['**/*.md'],
  legacy: {
    inconsistentCjsInterop: true,
  },
  build: {
    rolldownOptions: {
      // lazyBarrel seems like it'd be helpful, but it breaks parts of material-ui
      // experimental: { lazyBarrel: true },
      plugins: [
        flowPlugin(),
        transformImports({
          '@material-ui/core': {
            transform: [
              ['Styles', '@material-ui/core/styles'],
              ['*', '@material-ui/core/{{member}}'],
            ],
          },
          '@material-ui/icons': {
            transform: '@material-ui/icons/{{member}}',
          },
        }),
      ],
    },
    // sourcemap: mode === 'development',
    sourcemap: command === 'serve',
  },
  optimizeDeps: {
    rolldownOptions: {
      // lazyBarrel seems like it'd be helpful, but it breaks parts of material-ui
      // experimental: { lazyBarrel: true },
      plugins: [
        flowPlugin(),
        transformImports({
          '@material-ui/core': {
            transform: [
              ['Styles', '@material-ui/core/styles'],
              ['*', '@material-ui/core/{{member}}'],
            ],
          },
          '@material-ui/icons': {
            transform: '@material-ui/icons/{{member}}',
          },
        }),
      ],
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
  ],
  resolve: {
    alias: {
      '@lca': resolve(__dirname, 'app/javascript/lca'),
      Docs: resolve(__dirname, 'docs'),
      components: resolve(__dirname, 'app/javascript/lca/components'),
      containers: resolve(__dirname, 'app/javascript/lca/containers'),
      ducks: resolve(__dirname, 'app/javascript/lca/ducks'),
      hooks: resolve(__dirname, 'app/javascript/lca/hooks'),
      icons: resolve(__dirname, 'app/javascript/lca/icons'),
      selectors: resolve(__dirname, 'app/javascript/lca/selectors'),
      styles: resolve(__dirname, 'app/javascript/lca/styles'),
      utils: resolve(__dirname, 'app/javascript/lca/utils'),
      '@material-ui/core/createStyles': '@material-ui/core/styles',
      '@material-ui/core/makeStyles': '@material-ui/core/styles',
      '@material-ui/core/withStyles': '@material-ui/core/styles',
      '@material-ui/core': '@material-ui/core/esm',
      '@material-ui/icons': '@material-ui/icons/esm',
    },
  },
  test: {
    dir: 'app/javascript/lca',
    globals: true,
    coverage: {
      provider: 'v8',
      include: ['app/javascript/lca/**/*.{ts,tsx}'],
    },
  },
}))
