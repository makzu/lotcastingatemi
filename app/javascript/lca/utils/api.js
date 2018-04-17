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

export const callApi = (callBody: Object) => ({
  [RSAA]: {
    ...callBody,
    headers: authHeaders,
  },
})

export const callApiNoAuth = (callBody: Object) => ({
  [RSAA]: {
    ...callBody,
    headers: nonAuthHeaders,
  },
})
