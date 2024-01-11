import { State } from 'ducks'
import { SWITCH_THEME } from 'ducks/app'
import { Middleware } from 'redux'

// Saves changes to the theme to LocalStorage
// eslint-disable-next-line no-unused-vars
const themeSaver: Middleware<object, State> =
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
