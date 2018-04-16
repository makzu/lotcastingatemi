// @flow
import { BEGIN, COMMIT, REVERT } from 'redux-optimistic-ui'
import { callApi } from 'utils/api.js'

export const QCM_CREATE =            'lca/qc_merit/CREATE'
export const QCM_CREATE_SUCCESS =    'lca/qc_merit/CREATE_SUCCESS'
export const QCM_CREATE_FAILURE =    'lca/qc_merit/CREATE_FAILURE'
export const QCM_UPDATE =            'lca/qc_merit/UPDATE'
export const QCM_UPDATE_SUCCESS =    'lca/qc_merit/UPDATE_SUCCESS'
export const QCM_UPDATE_FAILURE =    'lca/qc_merit/UPDATE_FAILURE'
export const QCM_DESTROY =           'lca/qc_merit/DESTROY'
export const QCM_DESTROY_SUCCESS =   'lca/qc_merit/DESTROY_SUCCESS'
export const QCM_DESTROY_FAILURE =   'lca/qc_merit/DESTROY_FAILURE'

export default (state: Object, action: Object) => {
  // Optimistic update
  if (action.type === QCM_UPDATE) {
    return { ...state,
      qc_merits: {
        ...state.qc_merits,
        [action.meta.id]: {
          ...state.qc_merits[action.meta.id],
          ...action.payload,
        }}}}

  return state
}

export function createQcMerit(qcId: number) {
  let merit = { qc_merit: { qc_id: qcId }}

  return callApi({
    endpoint: `/api/v1/qcs/${qcId}/qc_merits`,
    method: 'POST',
    body: JSON.stringify(merit),
    types: [QCM_CREATE, QCM_CREATE_SUCCESS, QCM_CREATE_FAILURE]
  })
}

export function updateQcMerit(id: number, qcId: number, trait: string, value: string) {
  return updateQcMeritMulti(id, qcId, { [trait]: value })
}

let nextTransactionId = 0
export function updateQcMeritMulti(id: number, qcId: number, merit: Object) {
  let transactionId = 'QCmerit' + nextTransactionId++
  return callApi({
    endpoint: `/api/v1/characters/${qcId}/merits/${id}`,
    method: 'PATCH',
    body: JSON.stringify(merit),
    types: [
      {
        type: QCM_UPDATE,
        meta: { id: id, optimistic: { type: BEGIN, id: transactionId }},
        payload: merit,
      },
      {
        type: QCM_UPDATE_SUCCESS,
        meta: { id: id, traits: merit, optimistic: { type: COMMIT, id: transactionId }},
      },
      {
        type: QCM_UPDATE_FAILURE,
        meta: { id: id, optimistic: { type: REVERT, id: transactionId }},
      },
    ]
  })
}

export function destroyQcMerit(id: number, qcId: number) {
  return callApi({
    endpoint: `/api/v1/qcs/${qcId}/qc_merits/${id}`,
    method: 'DELETE',
    types: [
      QCM_DESTROY,
      { type: QCM_DESTROY_SUCCESS, meta: { id: id, qcId: qcId }},
      QCM_DESTROY_FAILURE
    ]
  })
}
