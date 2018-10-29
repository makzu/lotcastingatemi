// @flow
import { omit } from 'lodash'
import { BEGIN, COMMIT, REVERT } from 'redux-optimistic-ui'
import { callApi } from 'utils/api.js'
import type { EntityState } from './'

const POI_CREATE = 'lca/poison/CREATE'
const POI_CREATE_SUCCESS = 'lca/poison/CREATE_SUCCESS'
const POI_CREATE_FAILURE = 'lca/poison/CREATE_FAILURE'
const POI_UPDATE = 'lca/poison/UPDATE'
const POI_UPDATE_SUCCESS = 'lca/poison/UPDATE_SUCCESS'
const POI_UPDATE_FAILURE = 'lca/poison/UPDATE_FAILURE'
const POI_DESTROY = 'lca/poison/DESTROY'
const POI_DESTROY_SUCCESS = 'lca/poison/DESTROY_SUCCESS'
const POI_DESTROY_FAILURE = 'lca/poison/DESTROY_FAILURE'

export default (state: EntityState, action: Object) => {
  // Optimistic update
  if (action.type === POI_UPDATE) {
    return {
      ...state,
      poisons: {
        ...state.poisons,
        [action.meta.id]: {
          ...state.poisons[action.meta.id],
          ...action.payload,
        },
      },
    }
  } else if (action.type === POI_DESTROY) {
    const parent = getPoisonParent(state, action.meta.id)
    return {
      ...state,
      poisons: omit(state.poisons, action.meta.id),
      [parent]: {
        ...state[parent],
        [action.meta.qcId]: {
          ...state[parent][action.meta.qcId],
          poisons: state[parent][action.meta.qcId].poisons.filter(
            w => w != action.meta.id
          ),
        },
      },
    }
  }

  return state
}

export function createPoison(qcId: number, qcType: string) {
  let attack = {
    poison: { poisonable_id: qcId, poisonable_type: qcType },
  }

  return callApi({
    endpoint: `/api/v1/${qcType.toLowerCase()}s/${qcId}/poisons`,
    method: 'POST',
    body: JSON.stringify(attack),
    types: [POI_CREATE, POI_CREATE_SUCCESS, POI_CREATE_FAILURE],
  })
}

export function updatePoison(
  id: number,
  qcId: number,
  qcType: string,
  trait: string,
  value: string
) {
  return updatePoisonMulti(id, qcId, qcType, { [trait]: value })
}

let nextTransactionId = 0
export function updatePoisonMulti(
  id: number,
  qcId: number,
  qcType: string,
  attack: Object
) {
  let transactionId = 'QCattack' + nextTransactionId++
  return callApi({
    endpoint: `/api/v1/${qcType.toLowerCase()}s/${qcId}/poisons/${id}`,
    method: 'PATCH',
    body: JSON.stringify(attack),
    types: [
      {
        type: POI_UPDATE,
        meta: { id: id, optimistic: { type: BEGIN, id: transactionId } },
        payload: attack,
      },
      {
        type: POI_UPDATE_SUCCESS,
        meta: {
          id: id,
          traits: attack,
          optimistic: { type: COMMIT, id: transactionId },
        },
      },
      {
        type: POI_UPDATE_FAILURE,
        meta: { id: id, optimistic: { type: REVERT, id: transactionId } },
      },
    ],
  })
}

export function destroyPoison(id: number, qcId: number, qcType: string) {
  let transactionId = 'QCattack' + nextTransactionId++
  return callApi({
    endpoint: `/api/v1/${qcType.toLowerCase()}s/${qcId}/poisons/${id}`,
    method: 'DELETE',
    types: [
      {
        type: POI_DESTROY,
        meta: {
          id: id,
          qcId: qcId,
          optimistic: { type: BEGIN, id: transactionId },
        },
      },
      {
        type: POI_DESTROY_SUCCESS,
        meta: {
          id: id,
          qcId: qcId,
          optimistic: { type: COMMIT, id: transactionId },
        },
      },
      {
        type: POI_DESTROY_FAILURE,
        meta: { id: id, optimistic: { type: REVERT, id: transactionId } },
      },
    ],
  })
}

const getPoisonParent = (state: EntityState, id: number) => {
  const poison = state.poisons[id]
  switch (poison.poisonable_type) {
    case 'Qc':
      return 'qcs'
    case 'Battlegroup':
      return 'battlegroups'
    default:
      return 'characters'
  }
}
