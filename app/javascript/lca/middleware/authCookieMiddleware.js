import { LOGOUT } from '../ducks/account.js'

function isAuthFailure(action) {
  return (action.error && action.payload.status == 401)
}

// Intercepts LOGIN_SUCCESS action sent by redux-api-middleware and saves the
//   token to sessionStorage
// TODO change this to a cookie or something.
const authCookie = store => next => action => { //eslint-disable-line no-unused-vars
  if (action.type === LOGOUT || isAuthFailure(action)) {
    sessionStorage.removeItem('jwt')
  }

  return next(action)
}

export default authCookie
