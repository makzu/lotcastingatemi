// @flow
import { omit } from 'lodash'
import { BEGIN, COMMIT, REVERT } from 'redux-optimistic-ui'
import { callApi } from 'utils/api.js'
import type { EntityState } from './'

const CHM_CREATE = 'lca/charm/CREATE'
const CHM_CREATE_SUCCESS = 'lca/charm/CREATE_SUCCESS'
const CHM_CREATE_FAILURE = 'lca/charm/CREATE_FAILURE'
const CHM_UPDATE = 'lca/charm/UPDATE'
const CHM_UPDATE_SUCCESS = 'lca/charm/UPDATE_SUCCESS'
const CHM_UPDATE_FAILURE = 'lca/charm/UPDATE_FAILURE'
const CHM_DESTROY = 'lca/charm/DESTROY'
const CHM_DESTROY_SUCCESS = 'lca/charm/DESTROY_SUCCESS'
const CHM_DESTROY_FAILURE = 'lca/charm/DESTROY_FAILURE'

export default (state: EntityState, action: Object) => {
  // Optimistic update
  if (action.type === CHM_UPDATE) {
    return {
      ...state,
      charms: {
        ...state.charms,
        [action.meta.id]: {
          ...state.charms[action.meta.id],
          ...action.payload,
        },
      },
    }
  } else if (action.type === CHM_DESTROY) {
    const assoc = getCharmAssoc(state, action.meta.id)
    return {
      ...state,
      charms: omit(state.charms, action.meta.id),
      characters: {
        ...state.characters,
        [action.meta.charId]: {
          ...state.characters[action.meta.charId],
          [assoc]: state.characters[action.meta.charId][assoc].filter(
            w => w != action.meta.id
          ),
        },
      },
    }
  }

  return state
}

export function createCharm(charId: number, type: string) {
  let charm = { charm: { character_id: charId, type: type } }

  return callApi({
    endpoint: `/api/v1/characters/${charId}/charms`,
    method: 'POST',
    body: JSON.stringify(charm),
    types: [CHM_CREATE, CHM_CREATE_SUCCESS, CHM_CREATE_FAILURE],
  })
}

export function updateCharm(
  id: number,
  charId: number,
  trait: string,
  value: string
) {
  return updateCharmMulti(id, charId, { [trait]: value })
}

let nextTransactionId = 0
export function updateCharmMulti(id: number, charId: number, charm: Object) {
  let transactionId = 'charm' + nextTransactionId++
  return callApi({
    endpoint: `/api/v1/characters/${charId}/charms/${id}`,
    method: 'PATCH',
    body: JSON.stringify(charm),
    types: [
      {
        type: CHM_UPDATE,
        meta: { id: id, optimistic: { type: BEGIN, id: transactionId } },
        payload: charm,
      },
      {
        type: CHM_UPDATE_SUCCESS,
        meta: {
          id: id,
          traits: charm,
          optimistic: { type: COMMIT, id: transactionId },
        },
      },
      {
        type: CHM_UPDATE_FAILURE,
        meta: { id: id, optimistic: { type: REVERT, id: transactionId } },
      },
    ],
  })
}

export function destroyCharm(id: number, charId: number) {
  let transactionId = 'charm' + nextTransactionId++
  return callApi({
    endpoint: `/api/v1/characters/${charId}/charms/${id}`,
    method: 'DELETE',
    types: [
      {
        type: CHM_DESTROY,
        meta: {
          id: id,
          charId: charId,
          optimistic: { type: BEGIN, id: transactionId },
        },
      },
      {
        type: CHM_DESTROY_SUCCESS,
        meta: {
          id: id,
          charId: charId,
          optimistic: { type: COMMIT, id: transactionId },
        },
      },
      {
        type: CHM_DESTROY_FAILURE,
        meta: { id: id, optimistic: { type: REVERT, id: transactionId } },
      },
    ],
  })
}

const getCharmAssoc = (state: EntityState, id: number) => {
  const charm = state.charms[id]
  switch (charm.charm_type) {
    case 'MartialArts':
      return 'martial_arts_charms'
    case 'Spirit':
      return 'spirit_charms'
    case 'Evocation':
      return 'evocations'
    default:
      return 'charms'
  }
}
