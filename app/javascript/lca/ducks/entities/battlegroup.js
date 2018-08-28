// @flow
import { BEGIN, COMMIT, REVERT } from 'redux-optimistic-ui'
import { callApi } from 'utils/api.js'
import type { EntityState } from './'

const CREATE = 'lca/battlegroup/CREATE'
export const BG_CREATE_SUCCESS = 'lca/battlegroup/CREATE_SUCCESS'
const CREATE_FAILURE = 'lca/battlegroup/CREATE_FAILURE'
const UPDATE = 'lca/battlegroup/UPDATE'
const UPDATE_SUCCESS = 'lca/battlegroup/UPDATE_SUCCESS'
const UPDATE_FAILURE = 'lca/battlegroup/UPDATE_FAILURE'
const DESTROY = 'lca/battlegroup/DESTROY'
const DESTROY_SUCCESS = 'lca/battlegroup/DESTROY_SUCCESS'
const DESTROY_FAILURE = 'lca/battlegroup/DESTROY_FAILURE'

export default (state: EntityState, action: Object) => {
  // Optimistic update
  if (action.type === UPDATE) {
    return {
      ...state,
      battlegroups: {
        ...state.battlegroups,
        [action.meta.id]: {
          ...state.battlegroups[action.meta.id],
          ...action.payload,
        },
      },
    }
  }

  return state
}

export function createBattlegroup(bg: Object) {
  return callApi({
    endpoint: `/api/v1/battlegroups`,
    method: 'POST',
    body: JSON.stringify({ battlegroup: bg }),
    types: [CREATE, BG_CREATE_SUCCESS, CREATE_FAILURE],
  })
}

export function updateBattlegroup(id: number, trait: string, value: string) {
  return updateBattlegroupMulti(id, { [trait]: value })
}

let nextTransactionId = 0
export function updateBattlegroupMulti(id: number, battlegroup: Object) {
  let transactionId = 'battlegroup' + nextTransactionId++
  return callApi({
    endpoint: `/api/v1/battlegroups/${id}`,
    method: 'PATCH',
    body: JSON.stringify({ battlegroup: battlegroup }),
    types: [
      {
        type: UPDATE,
        meta: { id: id, optimistic: { type: BEGIN, id: transactionId } },
        payload: battlegroup,
      },
      {
        type: UPDATE_SUCCESS,
        meta: {
          id: id,
          traits: battlegroup,
          optimistic: { type: COMMIT, id: transactionId },
        },
      },
      {
        type: UPDATE_FAILURE,
        meta: { id: id, optimistic: { type: REVERT, id: transactionId } },
      },
    ],
  })
}

export function destroyBattlegroup(id: number) {
  return callApi({
    endpoint: `/api/v1/battlegroups/${id}`,
    method: 'DELETE',
    types: [
      DESTROY,
      { type: DESTROY_SUCCESS, meta: { id: id } },
      DESTROY_FAILURE,
    ],
  })
}
