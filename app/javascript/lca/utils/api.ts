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

export interface ApiAction {
  [RSAA: string]: {}
}

export interface ApiCall {
  endpoint: string
  method?: 'GET' | 'POST' | 'PATCH' | 'DELETE'
  body?: any
  types: string[] | object[]
}

/** Creates an RSAA to call an API endpoint using redux-api-middleware
 *
 * Method defaults to POST.
 */
export const callApi = (callBody: ApiCall): ApiAction => ({
  [RSAA]: {
    method: 'POST',
    ...callBody,
    headers: authHeaders,
  },
})

export const callApiNoAuth = (callBody: ApiCall) => ({
  [RSAA]: {
    ...callBody,
    headers: nonAuthHeaders,
  },
})
