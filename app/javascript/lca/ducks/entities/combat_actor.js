import { callApi } from '../../utils/api.js'

const CA_CREATE =          'lca/combat_actor/CREATE'
const CA_CREATE_SUCCESS =  'lca/combat_actor/CREATE_SUCCESS'
const CA_CREATE_FAILURE =  'lca/combat_actor/CREATE_FAILURE'
const CA_UPDATE =          'lca/combat_actor/UPDATE'
const CA_UPDATE_SUCCESS =  'lca/combat_actor/UPDATE_SUCCESS'
const CA_UPDATE_FAILURE =  'lca/combat_actor/UPDATE_FAILURE'
const CA_DESTROY =         'lca/combat_actor/DESTROY'
const CA_DESTROY_SUCCESS = 'lca/combat_actor/DESTROY_SUCCESS'
const CA_DESTROY_FAILURE = 'lca/combat_actor/DESTROY_FAILURE'

export function createCombatActor(combat_actor) {
  return callApi({
    endpoint: '/api/v1/combat_actors',
    method: 'POST',
    body: JSON.stringify({ combat_actor: combat_actor }),
    types: [CA_CREATE, CA_CREATE_SUCCESS, CA_CREATE_FAILURE]
  })
}

export function updateCombatActor(id, trait, value) {
  return updateCombatActorMulti(id, { [trait]: value })
}

export function updateCombatActorMulti(id, combat_actor) {
  return callApi({
    endpoint: `/api/v1/combat_actors/${id}`,
    method: 'PATCH',
    body: JSON.stringify({ combat_actor: combat_actor }),
    types: [
      { type: CA_UPDATE, meta: { id: id }},
      { type: CA_UPDATE_SUCCESS, meta: { id: id }},
      CA_UPDATE_FAILURE
    ]
  })
}

export function destroyCombatActor(id) {
  return callApi({
    endpoint: `/api/v1/combat_actors/${id}`,
    method: 'DELETE',
    types: [CA_DESTROY, CA_DESTROY_SUCCESS, CA_DESTROY_FAILURE]
  })
}
