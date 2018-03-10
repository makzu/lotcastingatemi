import { callApi } from '../../utils/api.js'

const QCA_CREATE =           'lca/qc_attack/CREATE'
const QCA_CREATE_SUCCESS =   'lca/qc_attack/CREATE_SUCCESS'
const QCA_CREATE_FAILURE =   'lca/qc_attack/CREATE_FAILURE'
const QCA_UPDATE =           'lca/qc_attack/UPDATE'
const QCA_UPDATE_SUCCESS =   'lca/qc_attack/UPDATE_SUCCESS'
const QCA_UPDATE_FAILURE =   'lca/qc_attack/UPDATE_FAILURE'
const QCA_DESTROY =          'lca/qc_attack/DESTROY'
const QCA_DESTROY_SUCCESS =  'lca/qc_attack/DESTROY_SUCCESS'
const QCA_DESTROY_FAILURE =  'lca/qc_attack/DESTROY_FAILURE'

export function createQcAttack(qcId, qcType) {
  let attack = { qc_attack: { qc_attackable_id: qcId, qc_attackable_type: qcType }}

  return callApi({
    endpoint: `/api/v1/${qcType.toLowerCase()}s/${qcId}/qc_attacks`,
    method: 'POST',
    body: JSON.stringify(attack),
    types: [QCA_CREATE, QCA_CREATE_SUCCESS, QCA_CREATE_FAILURE]
  })
}

export function updateQcAttack(id, qcId, qcType, trait, value) {
  let attack = { qc_attack: { [trait]: value }}

  return callApi({
    endpoint: `/api/v1/${qcType.toLowerCase()}s/${qcId}/qc_attacks/${id}`,
    method: 'PATCH',
    body: JSON.stringify(attack),
    types: [
      QCA_UPDATE,
      { type: QCA_UPDATE_SUCCESS, meta: { id: id, trait: trait }},
      QCA_UPDATE_FAILURE
    ]
  })
}

export function destroyQcAttack(id, qcId, qcType) {
  return callApi({
    endpoint: `/api/v1/${qcType.toLowerCase()}s/${qcId}/qc_attacks/${id}`,
    method: 'DELETE',
    types: [
      QCA_DESTROY,
      { type: QCA_DESTROY_SUCCESS, meta: { id: id, qcId: qcId, qcType: qcType }},
      QCA_DESTROY_FAILURE
    ]
  })
}
