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
    qc_merit: json
  }
}

//TODO handle errors here
export function updateQcMerit(id, qcId, trait, value) {
  return function (dispatch) {
    dispatch(updateQcMeritTrait(id, qcId, trait, value))

    let wp = { qc_merit: { [trait]: value }}

    return fetch(`/api/v1/qcs/${qcId}/qc_merits/${id}`, {
      method: 'PATCH',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      body: JSON.stringify(wp)
    }).then(response => response.json())
      .then(json =>
        dispatch(updateQcMeritTraitComplete(id, json))
      )
  }
}

function createQcMeritStart(qcId) {
  return {
    type: c.CREATE_QC_MERIT,
    qc: qcId
  }
}

function createQcMeritComplete(json) {
  return {
    type: c.CREATE_QC_MERIT_COMPLETE,
    qc_merit: json
  }
}

// TODO handle errors here
export function createQcMerit(qcId) {
  return function (dispatch) {
    dispatch(createQcMeritStart(qcId))

    let qc_merit = { qc_merit: { qc_id: qcId }}

    return fetch(`/api/v1/qcs/${qcId}/qc_merits`, {
      method: 'POST',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      body: JSON.stringify(qc_merit)
    }).then(response => response.json())
      .then(json =>
        dispatch(createQcMeritComplete(json))
      )
  }
}

function destroyQcMeritStart(id) {
  return {
    type: c.DESTROY_QC_MERIT,
    id: id
  }
}

function destroyQcMeritComplete(json) {
  return {
    type: c.DESTROY_QC_MERIT_COMPLETE,
    qc_merit: json
  }
}

// TODO handle errors here
export function destroyQcMerit(id, qcId) {
  return function (dispatch) {
    dispatch(destroyQcMeritStart(id))

    return fetch(`/api/v1/qcs/${qcId}/qc_merits/${id}`, {
      method: 'DELETE',
      headers: new Headers({ 'Content-Type': 'application/json' })
    }).then(response => response.json())
      .then(json =>
        dispatch(destroyQcMeritComplete(json))
      )
  }
}
