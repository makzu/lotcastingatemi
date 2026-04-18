import { LOGOUT, authFailure } from 'ducks/session'
import { crudAction } from 'ducks/entities/_lib'
import { isNonFetchAuthIssue } from 'ducks/app.js'
import { RootState } from 'store'
import { Middleware } from 'redux'

// Intercepts Logout actions and auth failures and removes the JWT as needed
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
const authToken: Middleware<{}, RootState> = (store) => (next) => (action) => {
  switch (action.type) {
    case LOGOUT:
    case crudAction('player', 'DESTROY').success.toString():
      localStorage.removeItem('jwt')
      break
  }

  if (isNonFetchAuthIssue(action)) {
    localStorage.removeItem('jwt')
    store.dispatch(authFailure())
  }

  return next(action)
}

export default authToken
