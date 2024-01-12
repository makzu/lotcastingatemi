import { switchTheme } from 'features/themeSlice'
import { Middleware } from 'redux'
import { RootState } from 'store'

/** Saves changes to the theme to LocalStorage */
const themeSaverMiddleware: Middleware<object, RootState> =
  (_store) => (next) => (action: ReturnType<typeof switchTheme>) => {
    switch (action.type) {
      case switchTheme.toString():
        localStorage.setItem('theme', action.payload)
        break
    }

    return next(action)
  }

export default themeSaverMiddleware
