import { FETCH_SUCCESS as PLAYER_FETCH_SUCCESS } from './entities/player.js'

export const LOGOUT =         'lca/session/LOGOUT'

const defaultState = {
  authenticated: !!sessionStorage.jwt || false,
  id: 0,
  fetching: false,
  error: {},
}

export default function SessionReducer(state = defaultState, action) {
  switch(action.type) {

  case LOGOUT:
    return { ...state,
      authenticated: !!sessionStorage.jwt,
      fetching: false,
      id: 0,
      error: {},
      errorMessage: '',
    }

  case PLAYER_FETCH_SUCCESS:
    return { ...state,
      id: action.payload.result
    }

  default:
    return state
  }
}

export function logout() {
  return { type: LOGOUT }
}
