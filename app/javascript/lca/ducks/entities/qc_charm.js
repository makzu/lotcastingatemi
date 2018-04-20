// @flow
import { BEGIN, COMMIT, REVERT } from 'redux-optimistic-ui'
import { callApi } from 'utils/api.js'
import type { EntityState } from './'

export const QCC_CREATE = 'lca/qc_charm/CREATE'
export const QCC_CREATE_SUCCESS = 'lca/qc_charm/CREATE_SUCCESS'
export const QCC_CREATE_FAILURE = 'lca/qc_charm/CREATE_FAILURE'
export const QCC_UPDATE = 'lca/qc_charm/UPDATE'
export const QCC_UPDATE_SUCCESS = 'lca/qc_charm/UPDATE_SUCCESS'
export const QCC_UPDATE_FAILURE = 'lca/qc_charm/UPDATE_FAILURE'
export const QCC_DESTROY = 'lca/qc_charm/DESTROY'
export const QCC_DESTROY_SUCCESS = 'lca/qc_charm/DESTROY_SUCCESS'
export const QCC_DESTROY_FAILURE = 'lca/qc_charm/DESTROY_FAILURE'

export default (state: EntityState, action: Object) => {
  // Optimistic update
  if (action.type === QCC_UPDATE) {
    return {
      ...state,
      qc_charms: {
        ...state.qc_charms,
        [action.meta.id]: {
          ...state.qc_charms[action.meta.id],
          ...action.payload,
        },
      },
    }
  }

  return state
}

export function createQcCharm(qcId: number) {
  let charm = { qc_charm: { qc_id: qcId } }

  return callApi({
    endpoint: `/api/v1/qcs/${qcId}/qc_charms`,
    method: 'POST',
    body: JSON.stringify(charm),
    types: [QCC_CREATE, QCC_CREATE_SUCCESS, QCC_CREATE_FAILURE],
  })
}

export function updateQcCharm(
  id: number,
  qcId: number,
  trait: string,
  value: string
) {
  return updateQcCharmMulti(id, qcId, { [trait]: value })
}

let nextTransactionId = 0
export function updateQcCharmMulti(id: number, qcId: number, charm: Object) {
  let transactionId = 'QCcharm' + nextTransactionId++
  return callApi({
    endpoint: `/api/v1/qcs/${qcId}/qc_charms/${id}`,
    method: 'PATCH',
    body: JSON.stringify(charm),
    types: [
      {
        type: QCC_UPDATE,
        meta: { id: id, optimistic: { type: BEGIN, id: transactionId } },
        payload: charm,
      },
      {
        type: QCC_UPDATE_SUCCESS,
        meta: {
          id: id,
          traits: charm,
          optimistic: { type: COMMIT, id: transactionId },
        },
      },
      {
        type: QCC_UPDATE_FAILURE,
        meta: { id: id, optimistic: { type: REVERT, id: transactionId } },
      },
    ],
  })
}

export function destroyQcCharm(id: number, qcId: number) {
  return callApi({
    endpoint: `/api/v1/qcs/${qcId}/qc_charms/${id}`,
    method: 'DELETE',
    types: [
      QCC_DESTROY,
      { type: QCC_DESTROY_SUCCESS, meta: { id: id, qcId: qcId } },
      QCC_DESTROY_FAILURE,
    ],
  })
}
