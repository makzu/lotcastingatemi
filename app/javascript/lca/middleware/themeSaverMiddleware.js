// @flow
import { SWITCH_THEME } from 'ducks/app'

// Saves changes to the theme to LocalStorage
// eslint-disable-next-line no-unused-vars
const themeSaver = (store: Object) => (next: Function) => (action: Object) => {
  switch (action.type) {
    case SWITCH_THEME:
      localStorage.setItem('theme', action.theme)
      break
  }

  return next(action)
}

export default themeSaver
