import { callApiNoAuth } from '../utils/api.js'
import { fetchCurrentPlayer } from './actions.js'
import { FETCH_SUCCESS as PLAYER_FETCH_SUCCESS } from './entities/player.js'

export const LOGIN_REQUEST =  'lca/session/LOGIN_REQUEST'
export const LOGIN_SUCCESS =  'lca/session/LOGIN_SUCCESS'
export const LOGIN_FAILURE =  'lca/session/LOGIN_FAILURE'
export const LOGOUT =         'lca/session/LOGOUT'

export const SIGNUP_REQUEST = 'lca/session/SIGNUP_REQUEST'
export const SIGNUP_SUCCESS = 'lca/session/SIGNUP_SUCCESS'
export const SIGNUP_FAILURE = 'lca/session/SIGNUP_FAILURE'

const defaultState = {
  authenticated: !!sessionStorage.jwt || false,
  id: 0,
  fetching: false,
  error: {},
}

export default function SessionReducer(state = defaultState, action) {
  switch(action.type) {

  case LOGIN_REQUEST:
    return { ...state,
      fetching: true,
      error: {},
    }

  case LOGIN_SUCCESS:
    return { ...state,
      authenticated: !!sessionStorage.jwt,
      fetching: false,
      error: {},
      id: parseInt(action.payload.id),
    }

  case LOGIN_FAILURE:
    return { ...state,
      fetching: false,
      id: 0,
      error: { login: action.payload.message },
    }

  case LOGOUT:
    return { ...state,
      authenticated: !!sessionStorage.jwt,
      fetching: false,
      id: 0,
      error: {},
      errorMessage: '',
    }

  case SIGNUP_REQUEST:
    return { ...state,
      fetching: true,
      error: {},
      errorMessage: '',
    }

  case SIGNUP_SUCCESS:
    return { ...state,
      authenticated: !!sessionStorage.jwt,
      fetching: false,
      error: {},
      id: action.payload.id,
    }

  case SIGNUP_FAILURE:
    return { ...state,
      authenticated: false,
      fetching: false,
      error: action.payload.response,
    }

  case PLAYER_FETCH_SUCCESS:
    return { ...state,
      id: action.payload.result
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
