import { LOGOUT } from '../ducks/account.js'

// Intercepts LOGIN_SUCCESS action sent by redux-api-middleware and saves the
//   token to sessionStorage
// TODO change this to a cookie or something.
const authCookie = store => next => action => { //eslint-disable-line no-unused-vars
  if (action.type === LOGOUT) {
    sessionStorage.removeItem('jwt')
  }

  return next(action)
}

export default authCookie
