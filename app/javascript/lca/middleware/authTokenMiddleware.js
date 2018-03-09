import { LOGOUT } from '../ducks/account.js'

function isAuthFailure(action) {
  return (action.error && action.payload.status == 401)
}

// Intercepts LOGIN_SUCCESS action sent by redux-api-middleware and saves the
//   token to localStorage
const authToken = store => next => action => { //eslint-disable-line no-unused-vars
  if (action.type === LOGOUT || isAuthFailure(action)) {
    localStorage.removeItem('jwt')
  }

  return next(action)
}

export default authToken
