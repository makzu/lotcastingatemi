import { callApi } from '../../utils/api.js'

export const QCC_CREATE =            'lca/qc_charm/CREATE'
export const QCC_CREATE_SUCCESS =    'lca/qc_charm/CREATE_SUCCESS'
export const QCC_CREATE_FAILURE =    'lca/qc_charm/CREATE_FAILURE'
export const QCC_UPDATE =            'lca/qc_charm/UPDATE'
export const QCC_UPDATE_SUCCESS =    'lca/qc_charm/UPDATE_SUCCESS'
export const QCC_UPDATE_FAILURE =    'lca/qc_charm/UPDATE_FAILURE'
export const QCC_DESTROY =           'lca/qc_charm/DESTROY'
export const QCC_DESTROY_SUCCESS =   'lca/qc_charm/DESTROY_SUCCESS'
export const QCC_DESTROY_FAILURE =   'lca/qc_charm/DESTROY_FAILURE'

export function createQcCharm(qcId) {
  let charm = { qc_charm: { qc_id: qcId }}

  return callApi({
    endpoint: `/api/v1/qcs/${qcId}/qc_charms`,
    method: 'POST',
    body: JSON.stringify(charm),
    types: [QCC_CREATE, QCC_CREATE_SUCCESS, QCC_CREATE_FAILURE]
  })
}

export function updateQcCharm(id, qcId, trait, value) {
  let charm = { qc_charm: { [trait]: value }}

  return callApi({
    endpoint: `/api/v1/qcs/${qcId}/qc_charms/${id}`,
    method: 'PATCH',
    body: JSON.stringify(charm),
    types: [
      QCC_UPDATE,
      { type: QCC_UPDATE_SUCCESS, meta: { id: id, trait: trait }},
      QCC_UPDATE_FAILURE
    ]
  })
}

export function destroyQcCharm(id, qcId) {
  return callApi({
    endpoint: `/api/v1/qcs/${qcId}/qc_charms/${id}`,
    method: 'DELETE',
    types: [
      QCC_DESTROY,
      { type: QCC_DESTROY_SUCCESS, meta: { id: id, qcId: qcId }},
      QCC_DESTROY_FAILURE
    ]
  })
}
