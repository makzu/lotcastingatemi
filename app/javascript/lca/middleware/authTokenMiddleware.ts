import type { Middleware } from 'redux'

import { isNonFetchAuthIssue } from '@lca/ducks/app.js'
import { crudAction } from '@lca/ducks/entities/_lib'
import { authFailure, LOGOUT } from '@lca/ducks/session'
import type { RootState } from '@lca/store'

// Intercepts Logout actions and auth failures and removes the JWT as needed
// biome-ignore lint/complexity/noBannedTypes: https://redux.js.org/usage/usage-with-typescript#type-checking-middleware
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
