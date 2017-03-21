import fetch from 'isomorphic-fetch'
import * as c from '../utils/constants'

function requestChronicle(id) {
  return {
    type: c.REQUEST_CHRONICLE,
    id
  }
}
function receiveChronicle(id, json) {
  return {
    type: c.RECEIVE_CHRONICLE,
    id,
    chronicle: json
  }
}

export function fetchChronicle(id) {
  return function (dispatch) {
    dispatch(requestChronicle(id))

    return fetch(`/api/v1/chronicles/${id}`)
      .then(response => response.json())
      .then(json =>
        dispatch(receiveChronicle(id, json))
      )
  }
}

