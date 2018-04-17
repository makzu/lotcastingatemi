// @flow
import { BEGIN, COMMIT, REVERT } from 'redux-optimistic-ui'
import { callApi } from 'utils/api.js'

const QCA_CREATE = 'lca/qc_attack/CREATE'
const QCA_CREATE_SUCCESS = 'lca/qc_attack/CREATE_SUCCESS'
const QCA_CREATE_FAILURE = 'lca/qc_attack/CREATE_FAILURE'
const QCA_UPDATE = 'lca/qc_attack/UPDATE'
const QCA_UPDATE_SUCCESS = 'lca/qc_attack/UPDATE_SUCCESS'
const QCA_UPDATE_FAILURE = 'lca/qc_attack/UPDATE_FAILURE'
const QCA_DESTROY = 'lca/qc_attack/DESTROY'
const QCA_DESTROY_SUCCESS = 'lca/qc_attack/DESTROY_SUCCESS'
const QCA_DESTROY_FAILURE = 'lca/qc_attack/DESTROY_FAILURE'

export default (state: Object, action: Object) => {
  // Optimistic update
  if (action.type === QCA_UPDATE) {
    return {
      ...state,
      qc_attacks: {
        ...state.qc_attacks,
        [action.meta.id]: {
          ...state.qc_attacks[action.meta.id],
          ...action.payload,
        },
      },
    }
  }

  return state
}

export function createQcAttack(qcId: number, qcType: string) {
  let attack = {
    qc_attack: { qc_attackable_id: qcId, qc_attackable_type: qcType },
  }

  return callApi({
    endpoint: `/api/v1/${qcType.toLowerCase()}s/${qcId}/qc_attacks`,
    method: 'POST',
    body: JSON.stringify(attack),
    types: [QCA_CREATE, QCA_CREATE_SUCCESS, QCA_CREATE_FAILURE],
  })
}

export function updateQcAttack(
  id: number,
  qcId: number,
  qcType: string,
  trait: string,
  value: string
) {
  return updateQcAttackMulti(id, qcId, qcType, { [trait]: value })
}

let nextTransactionId = 0
export function updateQcAttackMulti(
  id: number,
  qcId: number,
  qcType: string,
  attack: Object
) {
  let transactionId = 'QCattack' + nextTransactionId++
  return callApi({
    endpoint: `/api/v1/${qcType.toLowerCase()}s/${qcId}/qc_attacks/${id}`,
    method: 'PATCH',
    body: JSON.stringify(attack),
    types: [
      {
        type: QCA_UPDATE,
        meta: { id: id, optimistic: { type: BEGIN, id: transactionId } },
        payload: attack,
      },
      {
        type: QCA_UPDATE_SUCCESS,
        meta: {
          id: id,
          traits: attack,
          optimistic: { type: COMMIT, id: transactionId },
        },
      },
      {
        type: QCA_UPDATE_FAILURE,
        meta: { id: id, optimistic: { type: REVERT, id: transactionId } },
      },
    ],
  })
}

export function destroyQcAttack(id: number, qcId: number, qcType: string) {
  return callApi({
    endpoint: `/api/v1/${qcType.toLowerCase()}s/${qcId}/qc_attacks/${id}`,
    method: 'DELETE',
    types: [
      QCA_DESTROY,
      {
        type: QCA_DESTROY_SUCCESS,
        meta: { id: id, qcId: qcId, qcType: qcType },
      },
      QCA_DESTROY_FAILURE,
    ],
  })
}
