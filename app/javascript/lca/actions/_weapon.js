import fetch from 'isomorphic-fetch'
import * as c from '../utils/constants'

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
