import fetch from 'isomorphic-fetch'

import * as c from '../utils/constants'


//export const FAILURE = 'FAILURE'

function requestChar(id) {
  return {
    type: c.REQUEST_CHAR,
    id
  }
}
function receiveChar(id, json) {
  return {
    type: c.RECEIVE_CHAR,
    id,
    character: json
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

export function updateCharacter(id, trait, value) {
  // TODO post change to database
  return {
    type: c.UPDATE_CHAR,
    id: id,
    update: { trait: trait, value: value }
  }
}

export function toggleEditor() {
  return {
    type: c.TOGGLE_EDITOR
  }
}
