import fetch from 'isomorphic-fetch'
import * as c from '../utils/actionNames'

function updateQcMeritTrait(id, qcId, trait, value) {
  return {
    type: c.UPDATE_QC_MERIT,
    id: id,
    update: { trait: trait, value: value }
  }
}

function updateQcMeritTraitComplete(id, json) {
  return {
    type: c.UPDATE_QC_MERIT_COMPLETE,
    id: id,
    weapon: json
  }
}

export function updateQcMerit(id, qcId, trait, value) {
  return function (dispatch) {
    dispatch(updateQcMeritTrait(id, qcId, trait, value))

    let mt = { merit: { }}
    mt.merit[trait] = value

    return fetch(`/api/v1/qcs/${qcId}/merits/${id}`, {
      method: "PATCH",
      headers: new Headers({"Content-Type": "application/json"}),
      body: JSON.stringify(mt)
    }).then(response => response.json())
      .then(json =>
        dispatch(updateQcMeritTraitComplete(id, json))
      )
  }
}

function createQcMeritStart(qcId, name) {
  return {
    type: c.CREATE_QC_MERIT,
    name: name,
    qc: qcId
  }
}

function createQcMeritComplete(json) {
  return {
    type: c.CREATE_QC_MERIT_COMPLETE,
    merit: json
  }
}

// TODO handle errors here
export function createQcMerit(qcId, name) {
  return function (dispatch) {
    dispatch(createQcMeritStart(qcId, name))
    let merit = { merit: { name: name, qc_id: qcId }}
    return fetch('/api/v1/merits', {
      method: "POST",
      headers: new Headers({"Content-Type": "application/json"}),
      body: JSON.stringify(merit)
    }).then(response => response.json())
      .then(json =>
        dispatch(createQcMeritComplete(json))
      )
  }
}
