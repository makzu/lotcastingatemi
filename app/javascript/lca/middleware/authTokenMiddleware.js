// @flow
import { LOGOUT, authFailure } from 'ducks/session'
import { crudAction } from 'ducks/entities/_lib'
import { isAuthFailure } from 'ducks/app.js'

// Intercepts Logout actions and auth failures and removes the JWT as needed
const authToken = (store: Object) => (next: Function) => (action: Object) => {
  switch (action.type) {
    case LOGOUT:
    case crudAction('player', 'DESTROY').success.toString():
      localStorage.removeItem('jwt')
      break
  }

  if (isAuthFailure(action)) {
    localStorage.removeItem('jwt')
    store.dispatch(authFailure())
  }

  return next(action)
}

export default authToken
