import { callApiNoAuth } from '../utils/api.js'

const LOGIN_REQUEST = 'lca/session/LOGIN_REQUEST'
const LOGIN_SUCCESS = 'lca/session/LOGIN_SUCCESS'
const LOGIN_FAILURE = 'lca/session/LOGIN_FAILURE'
const LOGOUT =        'lca/session/LOGOUT'

const defaultState = {
  authenticated: !!sessionStorage.jwt,
  fetching: false,
  error: false,
  id: null
}

export default function SessionReducer(state = defaultState, action) {
  switch(action.type) {
  case LOGIN_REQUEST:
    return { ...state, fetching: true, error: false }

  case LOGIN_SUCCESS:
    return { ...state,
      authenticated: !!sessionStorage.jwt,
      fetching: false,
      error: false
    }

  case LOGIN_FAILURE:
    return { ...state, fetching: false, error: true }

  case LOGOUT:
    return { ...state,
      authenticated: !!sessionStorage.jwt,
      fetching: false,
      error: false,
      id: null
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
  sessionStorage.removeItem('jwt')
  return { type: LOGOUT }
}
