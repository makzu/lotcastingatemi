// @flow
import { omit } from 'lodash'
import { BEGIN, COMMIT, REVERT } from 'redux-optimistic-ui'
import { callApi } from 'utils/api.js'
import type { EntityState } from './'

const MRT_CREATE = 'lca/merit/CREATE'
const MRT_CREATE_SUCCESS = 'lca/merit/CREATE_SUCCESS'
const MRT_CREATE_FAILURE = 'lca/merit/CREATE_FAILURE'
const MRT_UPDATE = 'lca/merit/UPDATE'
const MRT_UPDATE_SUCCESS = 'lca/merit/UPDATE_SUCCESS'
const MRT_UPDATE_FAILURE = 'lca/merit/UPDATE_FAILURE'
const MRT_DESTROY = 'lca/merit/DESTROY'
const MRT_DESTROY_SUCCESS = 'lca/merit/DESTROY_SUCCESS'
const MRT_DESTROY_FAILURE = 'lca/merit/DESTROY_FAILURE'

export default (state: EntityState, action: Object) => {
  // Optimistic update
  if (action.type === MRT_UPDATE) {
    return {
      ...state,
      merits: {
        ...state.merits,
        [action.meta.id]: {
          ...state.merits[action.meta.id],
          ...action.payload,
        },
      },
    }
  } else if (action.type === MRT_DESTROY) {
    return {
      ...state,
      merits: omit(state.merits, action.meta.id),
      characters: {
        ...state.characters,
        [action.meta.charId]: {
          ...state.characters[action.meta.charId],
          merits: state.characters[action.meta.charId].merits.filter(
            w => w != action.meta.id
          ),
        },
      },
    }
  }

  return state
}

export function createMerit(charId: number) {
  let merit = { merit: { character_id: charId } }

  return callApi({
    endpoint: `/api/v1/characters/${charId}/merits`,
    method: 'POST',
    body: JSON.stringify(merit),
    types: [MRT_CREATE, MRT_CREATE_SUCCESS, MRT_CREATE_FAILURE],
  })
}

export function updateMerit(
  id: number,
  charId: number,
  trait: string,
  value: string
) {
  return updateMeritMulti(id, charId, { [trait]: value })
}

let nextTransactionId = 0
export function updateMeritMulti(id: number, charId: number, merit: Object) {
  let transactionId = 'merit' + nextTransactionId++
  return callApi({
    endpoint: `/api/v1/characters/${charId}/merits/${id}`,
    method: 'PATCH',
    body: JSON.stringify(merit),
    types: [
      {
        type: MRT_UPDATE,
        meta: { id: id, optimistic: { type: BEGIN, id: transactionId } },
        payload: merit,
      },
      {
        type: MRT_UPDATE_SUCCESS,
        meta: {
          id: id,
          traits: merit,
          optimistic: { type: COMMIT, id: transactionId },
        },
      },
      {
        type: MRT_UPDATE_FAILURE,
        meta: { id: id, optimistic: { type: REVERT, id: transactionId } },
      },
    ],
  })
}

export function destroyMerit(id: number, charId: number) {
  let transactionId = 'merit' + nextTransactionId++
  return callApi({
    endpoint: `/api/v1/characters/${charId}/merits/${id}`,
    method: 'DELETE',
    types: [
      {
        type: MRT_DESTROY,
        meta: {
          id: id,
          charId: charId,
          optimistic: { type: BEGIN, id: transactionId },
        },
      },
      {
        type: MRT_DESTROY_SUCCESS,
        meta: {
          id: id,
          charId: charId,
          optimistic: { type: COMMIT, id: transactionId },
        },
      },
      {
        type: MRT_DESTROY_FAILURE,
        meta: { id: id, optimistic: { type: REVERT, id: transactionId } },
      },
    ],
  })
}
