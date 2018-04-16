// @flow
import { normalize } from 'normalizr'
import { getJSON } from 'redux-api-middleware'
import { BEGIN, COMMIT, REVERT } from 'redux-optimistic-ui'

import * as schemas from './_schemas.js'
import { callApi } from 'utils/api.js'

export const CHA_CREATE =          'lca/character/CREATE'
export const CHA_CREATE_SUCCESS =  'lca/character/CREATE_SUCCESS'
export const CHA_CREATE_FAILURE =  'lca/character/CREATE_FAILURE'
export const CHA_FETCH =           'lca/character/FETCH'
export const CHA_FETCH_SUCCESS =   'lca/character/FETCH_SUCCESS'
export const CHA_FETCH_FAILURE =   'lca/character/FETCH_FAILURE'
export const CHA_UPDATE =          'lca/character/UPDATE'
export const CHA_UPDATE_SUCCESS =  'lca/character/UPDATE_SUCCESS'
export const CHA_UPDATE_FAILURE =  'lca/character/UPDATE_FAILURE'
export const CHA_DESTROY =         'lca/character/DESTROY'
export const CHA_DESTROY_SUCCESS = 'lca/character/DESTROY_SUCCESS'
export const CHA_DESTROY_FAILURE = 'lca/character/DESTROY_FAILURE'

export default (state: Object, action: Object) => {
  // Optimistic update
  if (action.type === CHA_UPDATE) {
    return { ...state,
      characters: {
        ...state.characters,
        [action.meta.id]: {
          ...state.characters[action.meta.id],
          ...action.payload,
        }}}}

  return state
}

export function createCharacter(char: Object) {
  return callApi({
    endpoint: '/api/v1/characters',
    method: 'POST',
    body: JSON.stringify({ character: char }),
    types: [CHA_CREATE, CHA_CREATE_SUCCESS, CHA_CREATE_FAILURE]
  })
}

export function fetchCharacter(id: number) {
  return callApi({
    endpoint: `/api/v1/characters/${id}`,
    method: 'GET',
    types: [
      CHA_FETCH,
      {
        type: CHA_FETCH_SUCCESS,
        payload: (action, state, res) => {
          return getJSON(res).then((json) => normalize(json, schemas.characters))
        }
      },
      CHA_FETCH_FAILURE
    ]
  })
}

export function updateCharacter(id: number, trait: string, value: string) {
  return updateCharacterMulti(id, { [trait]: value })
}

let nextTransactionId = 0
export function updateCharacterMulti(id: number, character: Object) {
  let transactionId = 'character' + nextTransactionId++
  return callApi({
    endpoint: `/api/v1/characters/${id}`,
    method: 'PATCH',
    body: JSON.stringify({ character: character }),
    types: [
      {
        type: CHA_UPDATE,
        meta: { id: id, optimistic: { type: BEGIN, id: transactionId }},
        payload: character,
      },
      {
        type: CHA_UPDATE_SUCCESS,
        meta: { id: id, traits: character, optimistic: { type: COMMIT, id: transactionId }},
      },
      {
        type: CHA_UPDATE_FAILURE,
        meta: { id: id, optimistic: { type: REVERT, id: transactionId }},
      },
    ]
  })
}

export function destroyCharacter(id: number) {
  return callApi({
    endpoint: `/api/v1/characters/${id}`,
    method: 'DELETE',
    types: [
      CHA_DESTROY,
      { type: CHA_DESTROY_SUCCESS, meta: { id: id }},
      CHA_DESTROY_FAILURE
    ]
  })
}
