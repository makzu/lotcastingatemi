// @flow
import { BEGIN, COMMIT, REVERT } from 'redux-optimistic-ui'
import { callApi } from 'utils/api.js'

const WEP_CREATE = 'lca/weapon/CREATE'
const WEP_CREATE_SUCCESS = 'lca/weapon/CREATE_SUCCESS'
const WEP_CREATE_FAILURE = 'lca/weapon/CREATE_FAILURE'
const WEP_UPDATE = 'lca/weapon/UPDATE'
const WEP_UPDATE_SUCCESS = 'lca/weapon/UPDATE_SUCCESS'
const WEP_UPDATE_FAILURE = 'lca/weapon/UPDATE_FAILURE'
const WEP_DESTROY = 'lca/weapon/DESTROY'
const WEP_DESTROY_SUCCESS = 'lca/weapon/DESTROY_SUCCESS'
const WEP_DESTROY_FAILURE = 'lca/weapon/DESTROY_FAILURE'

export default (state: Object, action: Object) => {
  // Optimistic update
  if (action.type === WEP_UPDATE) {
    return {
      ...state,
      weapons: {
        ...state.weapons,
        [action.meta.id]: {
          ...state.weapons[action.meta.id],
          ...action.payload,
        },
      },
    }
  }

  return state
}

export function createWeapon(charId: number) {
  let weapon = { weapon: { character_id: charId } }

  return callApi({
    endpoint: `/api/v1/characters/${charId}/weapons`,
    method: 'POST',
    body: JSON.stringify(weapon),
    types: [WEP_CREATE, WEP_CREATE_SUCCESS, WEP_CREATE_FAILURE],
  })
}

export function updateWeapon(
  id: number,
  charId: number,
  trait: string,
  value: string
) {
  return updateWeaponMulti(id, charId, { [trait]: value })
}

let nextTransactionId = 0
export function updateWeaponMulti(id: number, charId: number, weapon: Object) {
  let transactionId = 'weapon' + nextTransactionId++
  return callApi({
    endpoint: `/api/v1/characters/${charId}/weapons/${id}`,
    method: 'PATCH',
    body: JSON.stringify(weapon),
    types: [
      {
        type: WEP_UPDATE,
        meta: { id: id, optimistic: { type: BEGIN, id: transactionId } },
        payload: weapon,
      },
      {
        type: WEP_UPDATE_SUCCESS,
        meta: {
          id: id,
          traits: weapon,
          optimistic: { type: COMMIT, id: transactionId },
        },
      },
      {
        type: WEP_UPDATE_FAILURE,
        meta: { id: id, optimistic: { type: REVERT, id: transactionId } },
      },
    ],
  })
}

export function destroyWeapon(id: number, charId: number) {
  return callApi({
    endpoint: `/api/v1/characters/${charId}/weapons/${id}`,
    method: 'DELETE',
    types: [
      WEP_DESTROY,
      { type: WEP_DESTROY_SUCCESS, meta: { id: id, charId: charId } },
      WEP_DESTROY_FAILURE,
    ],
  })
}
