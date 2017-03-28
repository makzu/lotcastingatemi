import fetch from 'isomorphic-fetch'
import * as c from '../utils/actionNames'

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

function updateTrait(id, trait, value) {
  return {
    type: c.UPDATE_CHAR,
    id: id,
    update: { trait: trait, value: value }
  }
}

function updateTraitComplete(id, json) {
  return {
    type: c.UPDATE_CHAR_COMPLETE,
    id: id,
    character: json
  }
}

export function updateCharacter(id, trait, value) {
  return function (dispatch) {
    dispatch(updateTrait(id, trait, value))

    //let bd = { character: { id: id }}
    let bd = { character: { }}
    bd.character[trait] = value

    return fetch(`/api/v1/characters/${id}`, {
      method: "PATCH",
      headers: new Headers({"Content-Type": "application/json"}),
      body: JSON.stringify(bd)
    }).then(response => response.json())
      .then(json =>
        dispatch(updateTraitComplete(id, json))
      )
  }
}

function createCharacterStart(playerId, chronicleId, name) {
  return {
    type: c.CREATE_CHAR,
    name: name,
    player: playerId,
    chronicle: chronicleId
  }
}
function createCharacterComplete(json) {
  return {
    type: c.CREATE_CHAR_COMPLETE,
    character: json
  }
}
// TODO handle errors here
export function createCharacter(playerId, chronicleId, name) {
  return function (dispatch) {
    dispatch(createCharacterStart(playerId, chronicleId, name))
    let char = { character: { name: name, player_id: playerId, chronicle_id: chronicleId }}
    return fetch('/api/v1/characters', {
      method: "POST",
      headers: new Headers({"Content-Type": "application/json"}),
      body: JSON.stringify(char)
    }).then(response => response.json())
      .then(json =>
        dispatch(createCharacterComplete(json))
      )
  }
}
