// @flow
import { omit } from 'lodash'
import { BEGIN, COMMIT, REVERT } from 'redux-optimistic-ui'
import { callApi } from 'utils/api.js'
import type { EntityState } from './'

export const QCM_CREATE = 'lca/qc_merit/CREATE'
export const QCM_CREATE_SUCCESS = 'lca/qc_merit/CREATE_SUCCESS'
export const QCM_CREATE_FAILURE = 'lca/qc_merit/CREATE_FAILURE'
export const QCM_UPDATE = 'lca/qc_merit/UPDATE'
export const QCM_UPDATE_SUCCESS = 'lca/qc_merit/UPDATE_SUCCESS'
export const QCM_UPDATE_FAILURE = 'lca/qc_merit/UPDATE_FAILURE'
export const QCM_DESTROY = 'lca/qc_merit/DESTROY'
export const QCM_DESTROY_SUCCESS = 'lca/qc_merit/DESTROY_SUCCESS'
export const QCM_DESTROY_FAILURE = 'lca/qc_merit/DESTROY_FAILURE'

export default (state: EntityState, action: Object) => {
  // Optimistic update
  if (action.type === QCM_UPDATE) {
    return {
      ...state,
      qc_merits: {
        ...state.qc_merits,
        [action.meta.id]: {
          ...state.qc_merits[action.meta.id],
          ...action.payload,
        },
      },
    }
  } else if (action.type === QCM_DESTROY) {
    return {
      ...state,
      qc_merits: omit(state.qc_merits, action.meta.id),
      qcs: {
        ...state.qcs,
        [action.meta.qcId]: {
          ...state.qcs[action.meta.qcId],
          qc_merits: state.qcs[action.meta.qcId].qc_merits.filter(
            w => w != action.meta.id
          ),
        },
      },
    }
  }

  return state
}

export function createQcMerit(qcId: number) {
  let merit = { qc_merit: { qc_id: qcId } }

  return callApi({
    endpoint: `/api/v1/qcs/${qcId}/qc_merits`,
    method: 'POST',
    body: JSON.stringify(merit),
    types: [QCM_CREATE, QCM_CREATE_SUCCESS, QCM_CREATE_FAILURE],
  })
}

export function updateQcMerit(
  id: number,
  qcId: number,
  trait: string,
  value: string
) {
  return updateQcMeritMulti(id, qcId, { [trait]: value })
}

let nextTransactionId = 0
export function updateQcMeritMulti(id: number, qcId: number, merit: Object) {
  let transactionId = 'QCmerit' + nextTransactionId++
  return callApi({
    endpoint: `/api/v1/qcs/${qcId}/qc_merits/${id}`,
    method: 'PATCH',
    body: JSON.stringify(merit),
    types: [
      {
        type: QCM_UPDATE,
        meta: { id: id, optimistic: { type: BEGIN, id: transactionId } },
        payload: merit,
      },
      {
        type: QCM_UPDATE_SUCCESS,
        meta: {
          id: id,
          traits: merit,
          optimistic: { type: COMMIT, id: transactionId },
        },
      },
      {
        type: QCM_UPDATE_FAILURE,
        meta: { id: id, optimistic: { type: REVERT, id: transactionId } },
      },
    ],
  })
}

export function destroyQcMerit(id: number, qcId: number) {
  let transactionId = 'QCmerit' + nextTransactionId++
  return callApi({
    endpoint: `/api/v1/qcs/${qcId}/qc_merits/${id}`,
    method: 'DELETE',
    types: [
      {
        type: QCM_DESTROY,
        meta: {
          id: id,
          qcId: qcId,
          optimistic: { type: BEGIN, id: transactionId },
        },
      },
      {
        type: QCM_DESTROY_SUCCESS,
        meta: {
          id: id,
          qcId: qcId,
          optimistic: { type: COMMIT, id: transactionId },
        },
      },
      {
        type: QCM_DESTROY_FAILURE,
        meta: { id: id, optimistic: { type: REVERT, id: transactionId } },
      },
    ],
  })
}
