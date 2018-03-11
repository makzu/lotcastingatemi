import { SWITCH_THEME } from '../ducks/app.js'

// Saves changes to the theme to LocalStorage
const themeSaver = store => next => action => { //eslint-disable-line no-unused-vars
  switch (action.type) {
  case SWITCH_THEME:
    localStorage.theme = action.theme
    break
  }

  return next(action)
}

export default themeSaver
