// @flow
import { BEGIN, COMMIT, REVERT } from 'redux-optimistic-ui'
import { callApi } from 'utils/api.js'
import type { EntityState } from './'

const SPL_CREATE = 'lca/spell/CREATE'
const SPL_CREATE_SUCCESS = 'lca/spell/CREATE_SUCCESS'
const SPL_CREATE_FAILURE = 'lca/spell/CREATE_FAILURE'
const SPL_UPDATE = 'lca/spell/UPDATE'
const SPL_UPDATE_SUCCESS = 'lca/spell/UPDATE_SUCCESS'
const SPL_UPDATE_FAILURE = 'lca/spell/UPDATE_FAILURE'
const SPL_DESTROY = 'lca/spell/DESTROY'
const SPL_DESTROY_SUCCESS = 'lca/spell/DESTROY_SUCCESS'
const SPL_DESTROY_FAILURE = 'lca/spell/DESTROY_FAILURE'

export default (state: EntityState, action: Object) => {
  // Optimistic update
  if (action.type === SPL_UPDATE) {
    return {
      ...state,
      spells: {
        ...state.spells,
        [action.meta.id]: {
          ...state.spells[action.meta.id],
          ...action.payload,
        },
      },
    }
  }

  return state
}

export function createSpell(charId: number) {
  let spell = { spell: { character_id: charId } }

  return callApi({
    endpoint: `/api/v1/characters/${charId}/spells`,
    method: 'POST',
    body: JSON.stringify(spell),
    types: [SPL_CREATE, SPL_CREATE_SUCCESS, SPL_CREATE_FAILURE],
  })
}

export function updateSpell(
  id: number,
  charId: number,
  trait: string,
  value: string
) {
  return updateSpellMulti(id, charId, { [trait]: value })
}

let nextTransactionId = 0
export function updateSpellMulti(id: number, charId: number, spell: Object) {
  let transactionId = 'spell' + nextTransactionId++
  return callApi({
    endpoint: `/api/v1/characters/${charId}/spells/${id}`,
    method: 'PATCH',
    body: JSON.stringify(spell),
    types: [
      {
        type: SPL_UPDATE,
        meta: { id: id, optimistic: { type: BEGIN, id: transactionId } },
        payload: spell,
      },
      {
        type: SPL_UPDATE_SUCCESS,
        meta: {
          id: id,
          traits: spell,
          optimistic: { type: COMMIT, id: transactionId },
        },
      },
      {
        type: SPL_UPDATE_FAILURE,
        meta: { id: id, optimistic: { type: REVERT, id: transactionId } },
      },
    ],
  })
}

export function destroySpell(id: number, charId: number) {
  return callApi({
    endpoint: `/api/v1/characters/${charId}/spells/${id}`,
    method: 'DELETE',
    types: [
      SPL_DESTROY,
      { type: SPL_DESTROY_SUCCESS, meta: { id: id, charId: charId } },
      SPL_DESTROY_FAILURE,
    ],
  })
}
