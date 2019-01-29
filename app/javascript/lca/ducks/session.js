// @flow
import { isAuthFailure } from './app.js'
import { crudAction } from './entities/_lib'

export const LOGOUT = 'lca/session/LOGOUT'
export const AUTH_FAILURE = 'lca/session/AUTH_FAILURE'

type sessionState = {
  +authenticated: boolean,
  +id: number,
}

const defaultState: sessionState = {
  authenticated: !!localStorage.getItem('jwt') || false,
  id: 0,
  deleted: false,
}

export default function SessionReducer(
  state: sessionState = defaultState,
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

    case crudAction('player', 'DESTROY').success.toString():
      return {
        ...state,
        authenticated: false,
        id: 0,
        deleted: true,
      }

    case crudAction('player', 'FETCH').success.toString():
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
