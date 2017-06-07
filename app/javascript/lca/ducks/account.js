import { callApiNoAuth } from '../utils/api.js'

const LOGIN_REQUEST = 'lca/session/LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'lca/session/LOGIN_SUCCESS'
const LOGIN_FAILURE = 'lca/session/LOGIN_FAILURE'
export const LOGOUT =        'lca/session/LOGOUT'

const SIGNUP_REQUEST = 'lca/session/SIGNUP_REQUEST'
export const SIGNUP_SUCCESS = 'lca/session/SIGNUP_SUCCESS'
const SIGNUP_FAILURE = 'lca/session/SIGNUP_FAILURE'

const defaultState = {
  authenticated: !!sessionStorage.jwt,
  id: null
}

export default function SessionReducer(state = defaultState, action) {
  switch(action.type) {

  case LOGIN_SUCCESS:
    return { ...state,
      authenticated: !!sessionStorage.jwt
    }

  case LOGOUT:
    return { ...state,
      authenticated: !!sessionStorage.jwt,
      id: null
    }

  case SIGNUP_SUCCESS:
    return { ...state,
      authenticated: !!sessionStorage.jwt
    }
  default:
    return state
  }
}

export function login(credentials) {
  return callApiNoAuth({
    endpoint: '/api/v1/player_token',
    method: 'POST',
    body: JSON.stringify({ auth: credentials }),
    types: [LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE]
  })
}

export function logout() {
  return { type: LOGOUT }
}

export function signup(credentials) {
  return callApiNoAuth({
    endpoint: '/api/v1/players',
    method: 'POST',
    body: JSON.stringify({ player: credentials }),
    types: [SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAILURE]
  })
}
