import { LOGOUT, authFailure } from 'ducks/session'
import { crudAction } from 'ducks/entities/_lib'
import { isNonFetchAuthIssue } from 'ducks/app'

// Intercepts Logout actions and auth failures and removes the JWT as needed
const authToken =
  (store: $TSFixMe) => (next: $TSFixMeFunction) => (action: $TSFixMe) => {
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
