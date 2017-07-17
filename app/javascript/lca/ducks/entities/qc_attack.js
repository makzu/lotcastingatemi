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

export default function reducer(state, action) {
  const _id = action.payload != undefined ? action.payload.id : null
  const _trait = action.meta != undefined ? action.meta.trait : null

  switch(action.type) {
  case QCA_CREATE_SUCCESS:
    return _create_qc_attack(state, action)
  case QCA_UPDATE_SUCCESS:
    return { ...state, qc_attacks: {
      ...state.qc_attacks, [_id]: {
        ...state.qc_attacks[_id], [_trait]: action.payload[_trait] }}
    }
  case QCA_DESTROY_SUCCESS:
    return _destroy_qc_attack(state, action)
  default:
    return state
  }
}

export function createQcAttack(qcId) {
  let attack = { qc_attack: { qc_id: qcId }}

  return callApi({
    endpoint: `/api/v1/qcs/${qcId}/qc_attacks`,
    method: 'POST',
    body: JSON.stringify(attack),
    types: [QCA_CREATE, QCA_CREATE_SUCCESS, QCA_CREATE_FAILURE]
  })
}

export function updateQcAttack(id, qcId, qcType, trait, value) {
  let attack = { qc_attack: { [trait]: value }}

  return callApi({
    endpoint: `/api/v1/${qcType}s/${qcId}/qc_attacks/${id}`,
    method: 'PATCH',
    body: JSON.stringify(attack),
    types: [
      QCA_UPDATE,
      { type: QCA_UPDATE_SUCCESS, meta: { trait: trait }},
      QCA_UPDATE_FAILURE
    ]
  })
}

export function destroyQcAttack(id, qcId) {
  return callApi({
    endpoint: `/api/v1/qcs/${qcId}/qc_attacks/${id}`,
    method: 'DELETE',
    types: [
      QCA_DESTROY,
      { type: QCA_DESTROY_SUCCESS, meta: { id: id, qcId: qcId }},
      QCA_DESTROY_FAILURE
    ]
  })
}

function _create_qc_attack(state, action) {
  const id = action.payload.id
  const qcId = action.payload.qc_id

  const qc = { ...state.qcs[qcId] }
  qc.qc_attacks.push(id)

  return { ...state,
    qc_attacks: { ...state.qc_attacks, [id]: action.payload },
    qcs: { ...state.qcs, [qcId]: qc }
  }
}

function _destroy_qc_attack(state, action) {
  const id = action.meta.id
  const qcId = action.meta.qcId

  const newAttacks = { ...state.qc_attacks }

  delete newAttacks[id]

  const char = { ...state.qcs[qcId] }
  char.qc_attacks = char.qc_attacks.filter((e) => e != id)

  return { ...state, qc_attacks: newAttacks, qcs: { ...state.qcs, [qcId]: char }}
}
