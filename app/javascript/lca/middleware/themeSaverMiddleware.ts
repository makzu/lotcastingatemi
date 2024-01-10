import { SWITCH_THEME } from 'ducks/app.js'
import { Middleware } from 'redux'

// Saves changes to the theme to LocalStorage
// eslint-disable-next-line no-unused-vars
const themeSaver: Middleware<> =
  (_store) =>
  (next: $TSFixMeFunction) =>
  (action: Record<string, $TSFixMe>) => {
    switch (action.type) {
      case SWITCH_THEME:
        localStorage.setItem('theme', action.theme)
        break
    }

    return next(action)
  }

export default themeSaver
