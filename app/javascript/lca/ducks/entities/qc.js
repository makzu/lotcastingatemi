import { callApi } from '../../utils/api.js'

const QC_CREATE =          'lca/qc/CREATE'
const QC_CREATE_SUCCESS =  'lca/qc/CREATE_SUCCESS'
const QC_CREATE_FAILURE =  'lca/qc/CREATE_FAILURE'
const QC_UPDATE =          'lca/qc/UPDATE'
const QC_UPDATE_SUCCESS =  'lca/qc/UPDATE_SUCCESS'
const QC_UPDATE_FAILURE =  'lca/qc/UPDATE_FAILURE'
const QC_DESTROY =         'lca/qc/DESTROY'
const QC_DESTROY_SUCCESS = 'lca/qc/DESTROY_SUCCESS'
const QC_DESTROY_FAILURE = 'lca/qc/DESTROY_FAILURE'

export function createQc(qc) {
  return callApi({
    endpoint: '/api/v1/qcs',
    method: 'POST',
    body: JSON.stringify({ qc: qc }),
    types: [QC_CREATE, QC_CREATE_SUCCESS, QC_CREATE_FAILURE]
  })
}

export function updateQc(id, trait, value) {
  return updateQcMulti(id, { [trait]: value })
}

export function updateQcMulti(id, qc) {
  return callApi({
    endpoint: `/api/v1/qcs/${id}`,
    method: 'PATCH',
    body: JSON.stringify({ qc: qc }),
    types: [
      { type: QC_UPDATE, meta: { id: id }},
      { type: QC_UPDATE_SUCCESS, meta: { id: id }},
      QC_UPDATE_FAILURE
    ]
  })
}

export function destroyQc(id) {
  return callApi({
    endpoint: `/api/v1/qcs/${id}`,
    method: 'DELETE',
    types: [QC_DESTROY, QC_DESTROY_SUCCESS, QC_DESTROY_FAILURE]
  })
}
