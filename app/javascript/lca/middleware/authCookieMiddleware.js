const LOGIN_SUCCESS = 'lca/session/LOGIN_SUCCESS'

// Intercepts LOGIN_SUCCESS actions sent by redux-api-middleware and saves the
//   token to sessionStorage
// TODO change this to a cookie or something.
const authCookie = store => next => action => { //eslint-disable-line no-unused-vars
  if (action.type !== LOGIN_SUCCESS) {
    return next(action)
  }

  sessionStorage.jwt = action.payload.jwt

  return next(action)
}

export default authCookie
