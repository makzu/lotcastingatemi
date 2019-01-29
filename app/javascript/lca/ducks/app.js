// @flow
export const CLOSE_DRAWER = 'lca/app/CLOSE_DRAWER'
export const TOGGLE_DRAWER = 'lca/app/TOGGLE_DRAWER'
export const SWITCH_THEME = 'lca/app/SWITCH_THEME'

const defaultState = {
  drawerOpen: false,
  theme: (localStorage: Object).theme || 'light',
  loading: false,
  error: false,
  errorMessage: '',
}
type AppState = {
  +drawerOpen: boolean,
  +theme: 'dark' | 'light',
  +loading: boolean,
  +error: boolean,
  +errorMessage: string,
}

export const isAuthFailure = (action: Object) =>
  action.error && action.payload.status == 401
export const isForbidden = (action: Object) =>
  action.error && action.payload.status == 403
export const is404Error = (action: Object) =>
  action.error && action.payload.status == 404

export default function AppReducer(
  state: AppState = defaultState,
  action: Object
) {
  if (isAuthFailure(action) || isForbidden(action) || is404Error(action)) {
    return {
      ...state,
      loading: false,
      error: true,
      errorMessage: action.payload.message,
    }
  }
  if (action.error) {
    return { ...state, error: true, errorMessage: action.payload }
  }

  const act = action.type.split('/')
  if (act[0] === 'lca-api') {
    switch (act[4]) {
      case 'START':
        return {
          ...state,
          loading: true,
          error: false,
          errorMessage: '',
        }
      case 'SUCCESS':
        return {
          ...state,
          loading: false,
          error: false,
          errorMessage: '',
        }
      case 'FAILURE':
        return {
          ...state,
          loading: false,
          error: true,
          errorMessage: parseError(action),
        }
    }
  }

  switch (action.type) {
    case CLOSE_DRAWER:
      return {
        ...state,
        drawerOpen: false,
      }

    case TOGGLE_DRAWER:
      return {
        ...state,
        drawerOpen: !state.drawerOpen,
      }

    case SWITCH_THEME:
      return {
        ...state,
        theme: action.theme,
      }

    default:
      return state
  }
}

export const toggleDrawer = () => ({ type: TOGGLE_DRAWER })
export const closeDrawer = () => ({ type: CLOSE_DRAWER })
export const switchTheme = (theme: string) => ({
  type: SWITCH_THEME,
  theme: theme,
})

export const parseError = (action: Object): string => {
  if (action.payload === undefined || action.payload.response === undefined) {
    console.log('Easily Overlooked Error Method') // eslint-disable-line no-console
    return 'Error'
  }
  if (action.payload.status === 500)
    return action.payload.message || 'Internal Server Error'

  let keys = Object.keys(action.payload.response)
  return keys
    .map(k => k + ': ' + action.payload.response[k][0].error)
    .join(', ')
}
