import fetch from 'isomorphic-fetch'
import * as c from '../utils/actionNames'

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

    let mt = { merit: { [trait]: value }}

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

function createMeritStart(charId, name) {
  return {
    type: c.CREATE_MERIT,
    name: name,
    character: charId
  }
}

function createMeritComplete(json) {
  return {
    type: c.CREATE_MERIT_COMPLETE,
    merit: json
  }
}

// TODO handle errors here
export function createMerit(charId, name) {
  return function (dispatch) {
    dispatch(createMeritStart(charId, name))

    let merit = { merit: { name: name, character_id: charId }}

    return fetch('/api/v1/merits', {
      method: "POST",
      headers: new Headers({"Content-Type": "application/json"}),
      body: JSON.stringify(merit)
    }).then(response => response.json())
      .then(json =>
        dispatch(createMeritComplete(json))
      )
  }
}
