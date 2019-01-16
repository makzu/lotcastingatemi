// @flow
import { RSAA } from 'redux-api-middleware'

const headersBase = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
}

export const nonAuthHeaders = () => new Headers(headersBase)
export const authHeaders = () => {
  return new Headers({
    ...headersBase,
    AUTHORIZATION: `Bearer ${localStorage.getItem('jwt') || ''}`,
  })
}

export type ApiAction = {
  [RSAA]: {},
}

export type ApiCall = {
  endpoint: string,
  method: 'GET' | 'POST' | 'PATCH' | 'DELETE',
  body?: any,
  types: Array<string | Object>,
}

export const callApi = (callBody: ApiCall): ApiAction => ({
  [RSAA]: {
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
