import * as Redux from 'redux'
import { RSAA } from 'redux-api-middleware'

const headersBase = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
}

export const nonAuthHeaders = () => new Headers(headersBase)
export const authHeaders = () => {
  return new Headers({
    ...headersBase,
    AUTHORIZATION: `Bearer ${localStorage.getItem('jwt') || ''}`,
  })
}

export type ApiAction<R, S, F> = Record<string, ApiCall<R, S, F>>

export interface ApiCall<R, S, F> {
  endpoint: string
  method?: 'GET' | 'POST' | 'PATCH' | 'DELETE'
  body?: any
  types: [R, S, F]
  headers?: () => Headers
}
export type AApiCall = ApiCall<Redux.Action, Redux.Action, Redux.Action>
export type AApiAction = ApiAction<Redux.Action, Redux.Action, Redux.Action>

/** Creates an RSAA to call an API endpoint using redux-api-middleware
 *
 * Method defaults to POST.
 */
export const callApi = (callBody: AApiCall): AApiAction => ({
  [RSAA]: {
    method: 'POST',
    ...callBody,
    headers: authHeaders,
  },
})

export const callApiNoAuth = (callBody: AApiCall) => ({
  [RSAA]: {
    ...callBody,
    headers: nonAuthHeaders,
  },
})

export type Dispatch<S> = (rsaa: AApiAction) => void
