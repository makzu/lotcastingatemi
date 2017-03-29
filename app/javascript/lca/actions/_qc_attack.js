import fetch from 'isomorphic-fetch'
import * as c from '../utils/actionNames'

function updateQcAttackTrait(id, qcId, trait, value) {
  return {
    type: c.UPDATE_QC_ATTACK,
    id: id,
    update: { trait: trait, value: value }
  }
}

function updateQcAttackTraitComplete(id, json) {
  return {
    type: c.UPDATE_QC_ATTACK_COMPLETE,
    id: id,
    qc_attack: json
  }
}

//TODO handle errors here
export function updateQcAttack(id, qcId, trait, value) {
  return function (dispatch) {
    dispatch(updateQcAttackTrait(id, qcId, trait, value))

    let wp = { qc_attack: { [trait]: value }}

    return fetch(`/api/v1/qcs/${qcId}/qc_attacks/${id}`, {
      method: "PATCH",
      headers: new Headers({"Content-Type": "application/json"}),
      body: JSON.stringify(wp)
    }).then(response => response.json())
      .then(json =>
        dispatch(updateQcAttackTraitComplete(id, json))
      )
  }
}

function createQcAttackStart(qcId) {
  return {
    type: c.CREATE_QC_ATTACK,
    qc: qcId
  }
}

function createQcAttackComplete(json) {
  return {
    type: c.CREATE_QC_ATTACK_COMPLETE,
    qc_attack: json
  }
}

// TODO handle errors here
export function createQcAttack(qcId) {
  return function (dispatch) {
    dispatch(createQcAttackStart(qcId))

    let qc_attack = { qc_attack: { qc_id: qcId }}

    return fetch(`/api/v1/qcs/${qcId}/qc_attacks`, {
      method: "POST",
      headers: new Headers({"Content-Type": "application/json"}),
      body: JSON.stringify(qc_attack)
    }).then(response => response.json())
      .then(json =>
        dispatch(createQcAttackComplete(json))
      )
  }
}

function destroyQcAttackStart(id) {
  return {
    type: c.DESTROY_QC_ATTACK,
    id: id
  }
}

function destroyQcAttackComplete(json) {
  return {
    type: c.DESTROY_QC_ATTACK_COMPLETE,
    qc_attack: json
  }
}

// TODO handle errors here
export function destroyQcAttack(id, qcId) {
  return function (dispatch) {
    dispatch(destroyQcAttackStart(id))

    return fetch(`/api/v1/qcs/${qcId}/qc_attacks/${id}`, {
      method: "DELETE",
      headers: new Headers({"Content-Type": "application/json"})
    }).then(response => response.json())
      .then(json =>
        dispatch(destroyQcAttackComplete(json))
      )
  }
}
