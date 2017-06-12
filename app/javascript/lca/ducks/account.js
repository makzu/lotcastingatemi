import { callApiNoAuth } from '../utils/api.js'
import { fetchCurrentPlayer } from './actions.js'

export const LOGIN_REQUEST =  'lca/session/LOGIN_REQUEST'
export const LOGIN_SUCCESS =  'lca/session/LOGIN_SUCCESS'
export const LOGIN_FAILURE =  'lca/session/LOGIN_FAILURE'
export const LOGOUT =         'lca/session/LOGOUT'

export const SIGNUP_REQUEST = 'lca/session/SIGNUP_REQUEST'
export const SIGNUP_SUCCESS = 'lca/session/SIGNUP_SUCCESS'
export const SIGNUP_FAILURE = 'lca/session/SIGNUP_FAILURE'

const defaultState = {
  authenticated: !!sessionStorage.jwt || false,
  id: '0',
  fetching: false,
  error: false
}

export default function SessionReducer(state = defaultState, action) {
  switch(action.type) {

  case LOGIN_REQUEST:
    return { ...state,
      fetching: true,
      error: false
    }

  case LOGIN_SUCCESS:
    return { ...state,
      authenticated: !!sessionStorage.jwt,
      fetching: false,
      error: false,
      id: action.payload.id
    }

  case LOGIN_FAILURE:
    return { ...state,
      fetching: false,
      error: true,
      id: 0
    }

  case LOGOUT:
    return { ...state,
      authenticated: !!sessionStorage.jwt,
      fetching: false,
      error: false,
      id: 0
    }

  case SIGNUP_SUCCESS:
    return { ...state,
      authenticated: !!sessionStorage.jwt,
      fetching: false,
      error: false,
      id: action.payload.id
    }
  default:
    return state
  }
}

export function loginAndFetch(credentials) {
  return (dispatch) => {
    dispatch(login(credentials)).then(() => dispatch(fetchCurrentPlayer()))
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
