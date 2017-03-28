import fetch from 'isomorphic-fetch'
import * as c from '../utils/actionNames'

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

function createWeaponStart(charId, name) {
  return {
    type: c.CREATE_WEAPON,
    name: name,
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
export function createWeapon(charId, name) {
  return function (dispatch) {
    dispatch(createWeaponStart(charId, name))
    let weapon = { weapon: { name: name, character_id: charId }}
    return fetch('/api/v1/weapons', {
      method: "POST",
      headers: new Headers({"Content-Type": "application/json"}),
      body: JSON.stringify(weapon)
    }).then(response => response.json())
      .then(json =>
        dispatch(createWeaponComplete(json))
      )
  }
}
