import fetch from 'isomorphic-fetch'
import * as c from '../utils/actionNames'

function updateWeaponTrait(id, charId, trait, value) {
  return {
    type: c.UPDATE_QC_ATTACK,
    id: id,
    update: { trait: trait, value: value }
  }
}

function updateWeaponTraitComplete(id, json) {
  return {
    type: c.UPDATE_QC_ATTACK_COMPLETE,
    id: id,
    qc_attack: json
  }
}

export function updateWeapon(id, charId, trait, value) {
  return function (dispatch) {
    dispatch(updateWeaponTrait(id, charId, trait, value))

    let wp = { qc_attack: { }}

    wp.qc_attack[trait] = value

    return fetch(`/api/v1/qcs/${charId}/qc_attacks/${id}`, {
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
    type: c.CREATE_QC_ATTACK,
    name: name,
    qc: charId
  }
}

function createWeaponComplete(json) {
  return {
    type: c.CREATE_QC_ATTACK_COMPLETE,
    qc_attack: json
  }
}

// TODO handle errors here
export function createWeapon(charId, name) {
  return function (dispatch) {
    dispatch(createWeaponStart(charId, name))
    let qc_attack = { qc_attack: { name: name, qc_id: charId }}
    return fetch('/api/v1/qc_attacks', {
      method: "POST",
      headers: new Headers({"Content-Type": "application/json"}),
      body: JSON.stringify(qc_attack)
    }).then(response => response.json())
      .then(json =>
        dispatch(createWeaponComplete(json))
      )
  }
}
