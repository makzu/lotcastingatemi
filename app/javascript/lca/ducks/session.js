// @flow
import { isAuthFailure } from './app.js'
import { FETCH_SUCCESS as PLAYER_FETCH_SUCCESS } from './entities/player.js'

export const LOGOUT = 'lca/session/LOGOUT'
export const AUTH_FAILURE = 'lca/session/AUTH_FAILURE'

const defaultState = {
  authenticated: !!localStorage.getItem('jwt') || false,
  id: 0,
}

export default function SessionReducer(
  state: Object = defaultState,
  action: Object
) {
  if (isAuthFailure(action)) {
    return {
      ...state,
      authenticated: false,
      id: 0,
    }
  }

  switch (action.type) {
    case LOGOUT:
      return {
        ...state,
        authenticated: false,
        id: 0,
      }

    case PLAYER_FETCH_SUCCESS:
      return {
        ...state,
        id: action.payload.result,
      }

    default:
      return state
  }
}

export const logout = () => ({ type: LOGOUT })
export const authFailure = () => ({ type: AUTH_FAILURE })
