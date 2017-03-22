import fetch from 'isomorphic-fetch'
import * as c from '../utils/constants'

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
    weapon: json
  }
}

export function updateQc(id, trait, value) {
  return function (dispatch) {
    dispatch(updateQcTrait(id, charId, trait, value))

    let mt = { qc: { }}
    mt.qc[trait] = value

    return fetch(`/api/v1/qcs/${id}`, {
      method: "PATCH",
      headers: new Headers({"Content-Type": "application/json"}),
      body: JSON.stringify(mt)
    }).then(response => response.json())
      .then(json =>
        dispatch(updateQcTraitComplete(id, json))
      )
  }
}
