import fetch from 'isomorphic-fetch'
import * as c from '../utils/actionNames'

function updateQcTrait(id, trait, value) {
  return {
    type: c.UPDATE_QC,
    id: id,
    update: { trait: trait, value: value }
  }
}

function updateQcTraitComplete(id, json) {
  return {
    type: c.UPDATE_QC_COMPLETE,
    id: id,
    qc: json
  }
}

// TODO handle errors here
export function updateQc(id, trait, value) {
  return function (dispatch) {
    dispatch(updateQcTrait(id, trait, value))

    let mt = { qc: { [trait]: value }}

    return fetch(`/api/v1/qcs/${id}`, {
      method: 'PATCH',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      body: JSON.stringify(mt)
    }).then(response => response.json())
      .then(json =>
        dispatch(updateQcTraitComplete(id, json))
      )
  }
}
function createQcStart(playerId, chronicleId, name) {
  return {
    type: c.CREATE_QC,
    name: name,
    player: playerId,
    chronicle: chronicleId
  }
}
function createQcComplete(json) {
  return {
    type: c.CREATE_QC_COMPLETE,
    qc: json
  }
}
// TODO handle errors here
export function createQc(playerId, chronicleId, name) {
  return function (dispatch) {
    dispatch(createQcStart(playerId, chronicleId, name))

    let qc = { qc: { name: name, player_id: playerId, chronicle_id: chronicleId }}

    return fetch('/api/v1/qcs', {
      method: 'POST',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      body: JSON.stringify(qc)
    }).then(response => response.json())
      .then(json =>
        dispatch(createQcComplete(json))
      )
  }
}
