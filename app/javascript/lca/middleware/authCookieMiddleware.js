import { LOGIN_SUCCESS, LOGOUT, SIGNUP_SUCCESS } from '../ducks/account.js'

// Intercepts LOGIN_SUCCESS action sent by redux-api-middleware and saves the
//   token to sessionStorage
// TODO change this to a cookie or something.
const authCookie = store => next => action => { //eslint-disable-line no-unused-vars
  if (action.type === LOGIN_SUCCESS || action.type === SIGNUP_SUCCESS) {
    let jwt = action.payload.jwt
    let id = atob(jwt.split('.')[1]).substr(-2, 1)

    sessionStorage.jwt = jwt
    action.payload.id = id
  } else if (action.type === LOGOUT) {
    sessionStorage.removeItem('jwt')
  }

  return next(action)
}

export default authCookie
