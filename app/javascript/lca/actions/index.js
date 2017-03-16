import fetch from 'isomorphic-fetch'
import * as c from '../utils/constants'

//import { updateWeapon as _updateWeapon } from './weapon.js'
//export const updateWeapon = _updateWeapon

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
    //*/
  }
}
function updateWeaponTrait(id, charId, trait, value) {
  return {
    type: c.UPDATE_WEAP,
    id: id,
    update: { trait: trait, value: value }
  }
}

function updateWeaponTraitComplete(id, json) {
  return {
    type: c.UPDATE_WEAP_COMPLETE,
    id: id,
    weapon: json
  }
}

export function updateWeapon(id, charId, trait, value) {
  return function (dispatch) {
    dispatch(updateWeaponTrait(id, charId, trait, value))

    let wp = { weapon: { }}

    wp.weapon[trait] = value

    return fetch(`/api/v1/characters/${charId}/weapons/${id}`, {
      method: "PATCH",
      headers: new Headers({"Content-Type": "application/json"}),
      body: JSON.stringify(wp)
    }).then(response => response.json())
      .then(json =>
        dispatch(updateWeaponTraitComplete(id, json))
      )
  }
}

export function toggleEditor() {
  return {
    type: c.TOGGLE_EDITOR
  }
}

