import { RSAA, RSAAAction, RSAACall } from 'redux-api-middleware'

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

/** Creates an RSAA to call an API endpoint using redux-api-middleware
 *
 * Method defaults to POST.
 */
export const callApi = (callBody: RSAACall): RSAAAction => ({
  [RSAA]: {
    method: 'POST',
    ...callBody,
    headers: authHeaders,
  },
})

export const callApiNoAuth = (callBody: RSAACall): RSAAAction => ({
  [RSAA]: {
    ...callBody,
    headers: nonAuthHeaders,
  },
})
