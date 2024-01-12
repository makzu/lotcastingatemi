import { createAction } from '@reduxjs/toolkit'
import { Action } from 'redux'

export const CLOSE_DRAWER = 'lca/app/CLOSE_DRAWER'
export const TOGGLE_DRAWER = 'lca/app/TOGGLE_DRAWER'
export const SWITCH_THEME = 'lca/app/SWITCH_THEME'

const defaultState = {
  drawerOpen: false,
  theme: (localStorage.theme as 'dark' | 'light') ?? 'light',
  loading: false,
  error: false,
  errorMessage: '',
}
interface AppState {
  readonly drawerOpen: boolean
  readonly theme: 'dark' | 'light'
  readonly loading: boolean
  readonly error: boolean
  readonly errorMessage: string
}

export const isAuthFailure = (action: Record<string, $TSFixMe>) =>
  action.error && action.payload?.status == 401
export const isForbidden = (action: Record<string, $TSFixMe>) =>
  action.error && action.payload?.status == 403
export const is404Error = (action: Record<string, $TSFixMe>) =>
  action.error && action.payload?.status == 404

export const isNonFetchAuthIssue = (action: Record<string, $TSFixMe>) =>
  action.error &&
  [401, 401].includes(action.payload?.status) &&
  action.type !== 'lca-api/character/FETCH/FAILURE'

export default function AppReducer(
  state: AppState = defaultState,
  action: Action,
): AppState {
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
        return { ...state, loading: true, error: false, errorMessage: '' }

      case 'SUCCESS':
        return { ...state, loading: false, error: false, errorMessage: '' }

      case 'FAILURE':
        return {
          ...state,
          loading: false,
          error: true,
          errorMessage: parseError(action),
        }
    }
  }

  if (switchTheme.match(action)) {
    return { ...state, theme: action.payload }
  }

  switch (action.type) {
    case CLOSE_DRAWER:
      return { ...state, drawerOpen: false }

    case TOGGLE_DRAWER:
      return { ...state, drawerOpen: !state.drawerOpen }

    default:
      return state
  }
}

export const toggleDrawer = () => ({ type: TOGGLE_DRAWER })
export const closeDrawer = () => ({ type: CLOSE_DRAWER })
export const switchTheme = createAction<'light' | 'dark'>(SWITCH_THEME)

export const parseError = (action: Record<string, $TSFixMe>): string => {
  if (action.payload === undefined || action.payload.response === undefined) {
    console.log('Easily Overlooked Error Method', action) // eslint-disable-line no-console

    return 'Error'
  }

  if (action.payload.status === 500)
    return action.payload.message || 'Internal Server Error'

  const keys = Object.keys(action.payload.response)
  return keys
    .map((k) => k + ': ' + action.payload.response[k][0].error)
    .join(', ')
}
