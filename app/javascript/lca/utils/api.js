import { RSAA } from 'redux-api-middleware'

export function nonAuthHeaders() {
  return new Headers({ 'Content-Type': 'application/json' })
}
export function authHeaders () {
  return new Headers({
    'Content-Type': 'application/json',
    'AUTHORIZATION': `Bearer ${sessionStorage.jwt}`
  })
}

export function callApi(callBody) {
  return {
    [RSAA]: {
      ...callBody,
      headers: authHeaders
    }
  }
}

export function callApiNoAuth(callBody) {
  return {
    [RSAA]: {
      ...callBody,
      headers: nonAuthHeaders
    }
  }
}
