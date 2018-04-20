// @flow
import { RSAA } from 'redux-api-middleware'

export const nonAuthHeaders = () => {
  return new Headers({ 'Content-Type': 'application/json' })
}
export const authHeaders = () => {
  return new Headers({
    'Content-Type': 'application/json',
    AUTHORIZATION: `Bearer ${(localStorage: Object).jwt}`,
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
