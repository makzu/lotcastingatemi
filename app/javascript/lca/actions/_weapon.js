import fetch from 'isomorphic-fetch'
import * as c from '../utils/actionNames'

function updateWeaponTrait(id, charId, trait, value) {
  return {
    type: c.UPDATE_WEAPON,
    id: id,
    update: { trait: trait, value: value }
  }
}

function updateWeaponTraitComplete(id, json) {
  return {
    type: c.UPDATE_WEAPON_COMPLETE,
    id: id,
    weapon: json
  }
}

export function updateWeapon(id, charId, trait, value) {
  return function (dispatch) {
    dispatch(updateWeaponTrait(id, charId, trait, value))

    let wp = { weapon: { [trait]: value }}

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

function createWeaponStart(charId) {
  return {
    type: c.CREATE_WEAPON,
    character: charId
  }
}

function createWeaponComplete(json) {
  return {
    type: c.CREATE_WEAPON_COMPLETE,
    weapon: json
  }
}

// TODO handle errors here
export function createWeapon(charId) {
  return function (dispatch) {
    dispatch(createWeaponStart(charId))

    let weapon = { weapon: { character_id: charId }}

    return fetch(`/api/v1/characters/${charId}/weapons`, {
      method: "POST",
      headers: new Headers({"Content-Type": "application/json"}),
      body: JSON.stringify(weapon)
    }).then(response => response.json())
      .then(json =>
        dispatch(createWeaponComplete(json))
      )
  }
}

function destroyWeaponStart(id) {
  return {
    type: c.DESTROY_WEAPON,
    id: id
  }
}

function destroyWeaponComplete(json) {
  return {
    type: c.DESTROY_WEAPON_COMPLETE,
    weapon: json
  }
}

// TODO handle errors here
export function destroyWeapon(id, charId) {
  return function (dispatch) {
    dispatch(destroyWeaponStart(id))

    return fetch(`/api/v1/characters/${charId}/weapons/${id}`, {
      method: "DELETE",
      headers: new Headers({"Content-Type": "application/json"})
    }).then(response => response.json())
      .then(json =>
        dispatch(destroyWeaponComplete(json))
      )
  }
}
