import fetch from 'isomorphic-fetch'

export const REQUEST_CHAR = 'REQUEST_CHAR'
export const RECEIVE_CHAR = 'RECEIVE_CHAR'
//export const FAILURE = 'FAILURE'

function requestChar(id) {
  return {
    type: REQUEST_CHAR,
    id
  }
}
function receiveChar(id, json) {
  return {
    type: RECEIVE_CHAR,
    id,
    character: json,
    receivedAt: Date.now()
  }
}

export function fetchCharacter(id) {
  return function (dispatch) {
    dispatch(requestChar(id))

    return fetch(`/api/v1/characters/${id}`)
      .then(response => response.json())
      .then(json =>
        dispatch(receiveChar(id, json))
      )
  }
}
