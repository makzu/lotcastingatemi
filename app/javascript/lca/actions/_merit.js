import fetch from 'isomorphic-fetch'
import * as c from '../utils/constants'

function updateMeritTrait(id, charId, trait, value) {
  return {
    type: c.UPDATE_MERIT,
    id: id,
    update: { trait: trait, value: value }
  }
}

function updateMeritTraitComplete(id, json) {
  return {
    type: c.UPDATE_MERIT_COMPLETE,
    id: id,
    weapon: json
  }
}

export function updateMerit(id, charId, trait, value) {
  return function (dispatch) {
    dispatch(updateMeritTrait(id, charId, trait, value))

    let mt = { merit: { }}
    mt.merit[trait] = value

    return fetch(`/api/v1/characters/${charId}/merits/${id}`, {
      method: "PATCH",
      headers: new Headers({"Content-Type": "application/json"}),
      body: JSON.stringify(mt)
    }).then(response => response.json())
      .then(json =>
        dispatch(updateMeritTraitComplete(id, json))
      )
  }
}
