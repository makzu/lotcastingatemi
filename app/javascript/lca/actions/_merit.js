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
    merit: json
  }
}

export function updateMerit(id, charId, trait, value) {
  return function (dispatch) {
    dispatch(updateMeritTrait(id, charId, trait, value))

    let mt = { merit: { [trait]: value }}

    return fetch(`/api/v1/characters/${charId}/merits/${id}`, {
      method: 'PATCH',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      body: JSON.stringify(mt)
    }).then(response => response.json())
      .then(json =>
        dispatch(updateMeritTraitComplete(id, json))
      )
  }
}

function createMeritStart(charId) {
  return {
    type: c.CREATE_MERIT,
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
export function createMerit(charId) {
  return function (dispatch) {
    dispatch(createMeritStart(charId))

    let merit = { merit: { character_id: charId }}

    return fetch(`/api/v1/characters/${charId}/merits`, {
      method: 'POST',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      body: JSON.stringify(merit)
    }).then(response => response.json())
      .then(json =>
        dispatch(createMeritComplete(json))
      )
  }
}

function destroyMeritStart(id) {
  return {
    type: c.DESTROY_MERIT,
    id: id
  }
}

function destroyMeritComplete(json) {
  return {
    type: c.DESTROY_MERIT_COMPLETE,
    merit: json
  }
}

// TODO handle errors here
export function destroyMerit(id, charId) {
  return function (dispatch) {
    dispatch(destroyMeritStart(id))

    return fetch(`/api/v1/characters/${charId}/merits/${id}`, {
      method: 'DELETE',
      headers: new Headers({ 'Content-Type': 'application/json' })
    }).then(response => response.json())
      .then(json =>
        dispatch(destroyMeritComplete(json))
      )
  }
}
