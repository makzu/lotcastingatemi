import * as c from '../utils/actionNames'

const defaultState = {
  authenticated: !!sessionStorage.jwt,
  fetching: false,
  error: false,
  id: null
}

export default function SessionReducer(state = defaultState, action) {
  switch(action.type) {
  case c.LOGIN_START:
    return { ...state, fetching: true, error: false }

  case c.LOGIN_SUCCESS:
    return { ...state,
      authenticated: !!sessionStorage.jwt,
      fetching: false,
      error: false,
      id: action.player.id
    }

  case c.LOGOUT:
    return { ...state,
      authenticated: !!sessionStorage.jwt,
      fetching: false,
      error: false,
      id: null
    }

  case c.LOGIN_FAILED:
    return { ...state, fetching: false, error: true }

  default:
    return state
  }
}
