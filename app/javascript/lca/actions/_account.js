import fetch from 'isomorphic-fetch'
import { fetchPlayer } from './_player.js'
import * as c from '../utils/actionNames'

export function loginStart() {
  return { type: c.LOGIN_START }
}

export function loginSuccess() {
  return { type: c.LOGIN_SUCCESS }
}

export function loginFailed() {
  return { type: c.LOGIN_FAILED }
}

export function login(credentials) {
  return function(dispatch) {
    dispatch(loginStart())

    return fetch(`/api/v1/player_token`, {
      method: 'POST',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      body: JSON.stringify({ auth: credentials })
    }).then(response => response.json())
    .then(json => {
      sessionStorage.setItem('jwt', json.jwt)
      dispatch(loginSuccess(json))
      dispatch(fetchPlayer()) // TODO see if there is a better place for this
    })
    .catch(error =>
      dispatch(loginFailed(error))
    )
  }
}

export function logout() {
  sessionStorage.removeItem('jwt')
  return { type: c.LOGOUT }
}
