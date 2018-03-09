import { FETCH_SUCCESS as PLAYER_FETCH_SUCCESS } from './entities/player.js'

export const LOGOUT =         'lca/session/LOGOUT'

function isAuthFailure(action) {
  return (action.error && action.payload.status == 401)
}

const defaultState = {
  authenticated: !!localStorage.jwt || false,
  id: 0,
  error: '',
}

export default function SessionReducer(state = defaultState, action) {
  if (isAuthFailure(action)) {
    return { ...state,
      authenticated: false,
      id: 0,
      error: action.payload.status,
    }
  }

  switch(action.type) {
  case LOGOUT:
    return { ...state,
      authenticated: false,
      id: 0,
      error: '',
    }

  case PLAYER_FETCH_SUCCESS:
    return { ...state,
      id: action.payload.result,
      error: ''
    }

  default:
    return state
  }
}

export function logout() {
  return { type: LOGOUT }
}
