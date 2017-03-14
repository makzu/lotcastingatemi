import fetch from 'isomorphic-fetch'

import * as c from '../utils/constants'

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

function updateTrait(id, trait, value) {
  // TODO post change to API
  return {
    type: c.UPDATE_CHAR,
    id: id,
    update: { trait: trait, value: value }
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
  return function (dispatch) {
    dispatch(updateTrait(id, trait, value))

    let bd = { character: { id: id }}
    bd.character[trait] = value

    return fetch(`/api/v1/characters/${id}`, {
      method: "PATCH",
      headers: new Headers({"Content-Type": "application/json"}),
      body: JSON.stringify(bd)
    }) //*/
  }
}

export function toggleEditor() {
  return {
    type: c.TOGGLE_EDITOR
  }
}
