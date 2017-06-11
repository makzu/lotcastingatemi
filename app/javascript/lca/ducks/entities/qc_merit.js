import { callApi } from '../../utils/api.js'

export const QCM_CREATE =            'lca/qc_merit/CREATE'
export const QCM_CREATE_SUCCESS =    'lca/qc_merit/CREATE_SUCCESS'
export const QCM_CREATE_FAILURE =    'lca/qc_merit/CREATE_FAILURE'
export const QCM_UPDATE =            'lca/qc_merit/UPDATE'
export const QCM_UPDATE_SUCCESS =    'lca/qc_merit/UPDATE_SUCCESS'
export const QCM_UPDATE_FAILURE =    'lca/qc_merit/UPDATE_FAILURE'
export const QCM_DESTROY =           'lca/qc_merit/DESTROY'
export const QCM_DESTROY_SUCCESS =   'lca/qc_merit/DESTROY_SUCCESS'
export const QCM_DESTROY_FAILURE =   'lca/qc_merit/DESTROY_FAILURE'

export default function reducer(state, action) {
  const _id = action.payload != undefined ? action.payload.id : null
  const _trait = action.meta != undefined ? action.meta.trait : null

  switch(action.type) {
  case QCM_CREATE_SUCCESS:
    return _create_qc_merit(state, action)
  case QCM_UPDATE_SUCCESS:
    return { ...state, qc_merits: {
      ...state.qc_merits, [_id]: {
        ...state.qc_merits[_id], [_trait]: action.payload[_trait] }}
    }
  case QCM_DESTROY_SUCCESS:
    return _destroy_qc_merit(state, action)
  default:
    return state
  }
}

export function createQcMerit(qcId) {
  let merit = { qc_merit: { qc_id: qcId }}

  return callApi({
    endpoint: `/api/v1/qcs/${qcId}/qc_merits`,
    method: 'POST',
    body: JSON.stringify(merit),
    types: [QCM_CREATE, QCM_CREATE_SUCCESS, QCM_CREATE_FAILURE]
  })
}

export function updateQcMerit(id, qcId, trait, value) {
  let merit = { qc_merit: { [trait]: value }}

  return callApi({
    endpoint: `/api/v1/qcs/${qcId}/qc_merits/${id}`,
    method: 'PATCH',
    body: JSON.stringify(merit),
    types: [
      QCM_UPDATE,
      { type: QCM_UPDATE_SUCCESS, meta: { trait: trait }},
      QCM_UPDATE_FAILURE
    ]
  })
}

export function destroyQcMerit(id, qcId) {
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

export function _create_qc_merit(state, action) {
  const id = action.payload.id
  const qcId = action.payload.qc_id

  const qc = { ...state.qcs[qcId] }
  qc.qc_merits.push(id)

  return { ...state,
    qc_merits: { ...state.qc_merits, [id]: action.payload },
    qcs: { ...state.qcs, [qcId]: qc }
  }
}

export function _destroy_qc_merit(state, action) {
  const id = action.meta.id
  const qcId = action.meta.qcId

  const newMerits = { ...state.qc_merits }

  delete newMerits[id]

  const qc = { ...state.qcs[qcId] }
  qc.qc_merits = qc.qc_merits.filter((e) => e != id)

  return { ...state, qc_merits: newMerits, qcs: { ...state.qcs, [qcId]: qc }}
}
