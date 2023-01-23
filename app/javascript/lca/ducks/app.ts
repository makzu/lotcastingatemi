// TODO: Move from AnyAction to a real typed action
import { AnyAction } from 'redux'

export const SWITCH_THEME = 'lca/app/SWITCH_THEME'

const defaultState = {
  loading: false,
  error: false,
  errorMessage: '',
}
export type AppState = {
  loading: boolean
  error: boolean
  errorMessage: string
}

export const isAuthFailure = (action: AnyAction) =>
  action.error && (action.payload || {}).status == 401
export const isForbidden = (action: AnyAction) =>
  action.error && (action.payload || {}).status == 403
export const is404Error = (action: AnyAction) =>
  action.error && (action.payload || {}).status == 404

export const isNonFetchAuthIssue = (action: AnyAction) =>
  action.error &&
  [401, 401].includes((action.payload || {}).status) &&
  action.type !== 'lca-api/character/FETCH/FAILURE'

export default function AppReducer(
  state: AppState = defaultState,
  action: AnyAction,
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
    return { ...state, error: true }
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

  return state
}

export const parseError = (action: AnyAction): string => {
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
