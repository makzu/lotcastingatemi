import { SWITCH_THEME } from 'ducks/app.js'
import { Middleware } from 'redux'
import { StoreType } from 'store'

// Saves changes to the theme to LocalStorage

// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-object-type
const themeSaver: Middleware<{}, StoreType> = (store) => (next) => (action) => {
  switch (action.type) {
    case SWITCH_THEME:
      localStorage.setItem('theme', action.theme)
      break
  }

  return next(action)
}

export default themeSaver
