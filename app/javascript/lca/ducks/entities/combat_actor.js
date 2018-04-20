// @flow
import { BEGIN, COMMIT, REVERT } from 'redux-optimistic-ui'
import { callApi } from 'utils/api.js'
import type { EntityState } from './'

const CA_CREATE = 'lca/combat_actor/CREATE'
const CA_CREATE_SUCCESS = 'lca/combat_actor/CREATE_SUCCESS'
const CA_CREATE_FAILURE = 'lca/combat_actor/CREATE_FAILURE'
const CA_UPDATE = 'lca/combat_actor/UPDATE'
const CA_UPDATE_SUCCESS = 'lca/combat_actor/UPDATE_SUCCESS'
const CA_UPDATE_FAILURE = 'lca/combat_actor/UPDATE_FAILURE'
const CA_DESTROY = 'lca/combat_actor/DESTROY'
const CA_DESTROY_SUCCESS = 'lca/combat_actor/DESTROY_SUCCESS'
const CA_DESTROY_FAILURE = 'lca/combat_actor/DESTROY_FAILURE'

export default (state: EntityState, action: Object) => {
  // Optimistic update
  if (action.type === CA_UPDATE) {
    return {
      ...state,
      combat_actors: {
        ...state.combat_actors,
        [action.meta.id]: {
          ...state.combat_actors[action.meta.id],
          ...action.payload,
        },
      },
    }
  }

  return state
}

export function createCombatActor(combat_actor: Object) {
  return callApi({
    endpoint: '/api/v1/combat_actors',
    method: 'POST',
    body: JSON.stringify({ combat_actor: combat_actor }),
    types: [CA_CREATE, CA_CREATE_SUCCESS, CA_CREATE_FAILURE],
  })
}

export function updateCombatActor(id: number, trait: string, value: string) {
  return updateCombatActorMulti(id, { [trait]: value })
}

let nextTransactionId = 0
export function updateCombatActorMulti(id: number, combat_actor: Object) {
  let transactionId = 'combat_actor' + nextTransactionId++
  return callApi({
    endpoint: `/api/v1/combat_actors/${id}`,
    method: 'PATCH',
    body: JSON.stringify({ combat_actor: combat_actor }),
    types: [
      {
        type: CA_UPDATE,
        meta: { id: id, optimistic: { type: BEGIN, id: transactionId } },
        payload: combat_actor,
      },
      {
        type: CA_UPDATE_SUCCESS,
        meta: {
          id: id,
          traits: combat_actor,
          optimistic: { type: COMMIT, id: transactionId },
        },
      },
      {
        type: CA_UPDATE_FAILURE,
        meta: { id: id, optimistic: { type: REVERT, id: transactionId } },
      },
    ],
  })
}

export function destroyCombatActor(id: number) {
  return callApi({
    endpoint: `/api/v1/combat_actors/${id}`,
    method: 'DELETE',
    types: [CA_DESTROY, CA_DESTROY_SUCCESS, CA_DESTROY_FAILURE],
  })
}
