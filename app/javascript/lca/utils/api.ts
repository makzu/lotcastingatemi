import { RSAA ,type  RSAAAction,type  RSAACall  } from 'redux-api-middleware';

const headersBase = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
} as const

export const authHeaders = () => {
  return new Headers({
    ...headersBase,
    AUTHORIZATION: `Bearer ${localStorage.getItem('jwt') ?? ''}`,
  })
}

/** Creates an RSAA to call an API endpoint using redux-api-middleware
 *
 * Method defaults to POST.
 */
export const callApi = (
  callBody: Omit<RSAACall, 'method'> & { method?: RSAACall['method'] },
): RSAAAction => ({
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
