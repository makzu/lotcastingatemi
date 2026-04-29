import type { Middleware } from 'redux'

import { switchTheme } from '@lca/features/themeSlice'
import type { RootState } from '@lca/store'

// Saves changes to the theme to LocalStorage

// biome-ignore lint/complexity/noBannedTypes: https://redux.js.org/usage/usage-with-typescript#type-checking-middleware
const themeSaver: Middleware<{}, RootState> =
  (_store) => (next) => (action) => {
    if (switchTheme.match(action)) {
      localStorage.setItem('theme', action.payload)
    }

    return next(action)
  }

export default themeSaver
