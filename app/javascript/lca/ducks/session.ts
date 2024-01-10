import { isNonFetchAuthIssue } from './app.js'
import { crudAction } from './entities/_lib'

export const LOGOUT = 'lca/session/LOGOUT'
export const AUTH_FAILURE = 'lca/session/AUTH_FAILURE'

export interface ISessionState {
  authenticated: boolean
  id: number
  deleted: boolean
}

const defaultState: ISessionState = {
  authenticated: !!localStorage.getItem('jwt') || false,
  deleted: false,
  id: 0,
}

export default function SessionReducer(
  state: ISessionState = defaultState,
  action: any,
) {
  if (isNonFetchAuthIssue(action)) {
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
        deleted: true,
        id: 0,
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
