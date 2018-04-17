// @flow
import { LOGOUT, authFailure } from 'ducks/session.js'
import { isAuthFailure } from 'ducks/app.js'

// Intercepts Logout actions and auth failures and removes the JWT as needed
const authToken = (store: Object) => (next: Function) => (action: Object) => {
  if (action.type === LOGOUT) localStorage.removeItem('jwt')

  if (isAuthFailure(action)) {
    localStorage.removeItem('jwt')
    store.dispatch(authFailure())
  }

  return next(action)
}

export default authToken
