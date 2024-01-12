import { switchTheme } from 'ducks/app'
import { Action, Middleware } from 'redux'
import { RootState } from 'store'

// Saves changes to the theme to LocalStorage
const themeSaver: Middleware<object, RootState> =
  (_store) => (next) => (action: Action) => {
    if (switchTheme.match(action)) {
      localStorage.setItem('theme', action.payload)
    }

    return next(action)
  }

export default themeSaver
