// Common code for handing entities for the store.
// Vaguely follows the Ducks pattern: https://github.com/erikras/ducks-modular-redux
import { normalize } from 'normalizr'
import * as schemas from '../reducers/entities/_schemas.js'
import { callApi } from '../utils/api.js'

const FETCH =           'lca/qc/FETCH'
const FETCH_SUCCESS =   'lca/qc/FETCH_SUCCESS'
const FETCH_FAILURE =   'lca/qc/FETCH_FAILURE'
const UPDATE =          'lca/qc/UPDATE'
const UPDATE_SUCCESS =  'lca/qc/UPDATE_SUCCESS'
const UPDATE_FAILURE =  'lca/qc/UPDATE_FAILURE'
const CREATE =          'lca/qc/CREATE'
const CREATE_SUCCESS =  'lca/qc/CREATE_SUCCESS'
const CREATE_FAILURE =  'lca/qc/CREATE_FAILURE'
const DESTROY =         'lca/qc/DESTROY'
const DESTROY_SUCCESS = 'lca/qc/DESTROY_SUCCESS'
const DESTROY_FAILURE = 'lca/qc/DESTROY_FAILURE'

export default function reducer(state, action) {
  const _id = action.payload != undefined ? action.payload.id : null
  const _trait = action.meta != undefined ? action.meta.trait : null

  switch(action.type) {
  case CREATE_SUCCESS:
    return _get_qc(state, action)
  case FETCH_SUCCESS:
    return _get_qc(state, action)
  case UPDATE_SUCCESS:
    return { ...state, qcs: {
      ...state.qcs, [_id]: {
        ...state.qcs[_id], [_trait]: action.payload[_trait]
      }
    }}

  default:
    return state
  }
}

// Action creators:
export function createQc(playerId, chronicleId, name) {
  let qc = { qc: { name: name, player_id: playerId, chronicle_id: chronicleId }}

  return callApi({
    endpoint: '/api/v1/qcs',
    method: 'POST',
    body: JSON.stringify(qc),
    types: [CREATE, CREATE_SUCCESS, CREATE_FAILURE]
  })
}

export function fetchQc(id) {
  return callApi({
    endpoint: `/api/v1/qcs/${id}`,
    method: 'GET',
    types: [FETCH, FETCH_SUCCESS, FETCH_FAILURE]
  })
}

export function updateQc(id, trait, value) {
  return callApi({
    endpoint: `/api/v1/qcs/${id}`,
    method: 'PATCH',
    body: JSON.stringify({ qc: { [trait]: value }}),
    types: [
      UPDATE,
      { type: UPDATE_SUCCESS, meta: { trait: trait }},
      UPDATE_FAILURE
    ]
  })
}

export function destroyQc(id) {
  return callApi({
    endpoint: `/api/v1/qcs/${id}`,
    method: 'DELETE',
    types: [DESTROY, DESTROY_SUCCESS, DESTROY_FAILURE]
  })
}

// TODO clean this up:
function _get_qc(state, action) {
  const newState = normalize(action.payload, schemas.qc)
  const newQcs = newState.entities.qcs
  const newQcMerits = newState.entities.qcMerits
  const newQcAttacks = newState.entities.qcAttacks
  const owner = state.players[action.payload.player_id]

  const chronId = action.payload.chronicle_id
  let newChronicles = state.chronicles

  // Don't mess with Chronicles if they have not yet been loaded
  if (chronId != null && newChronicles[chronId] != null) {
    newChronicles = { ...newChronicles, [chronId]: {
      ...newChronicles[chronId],
      qcs: new Set([ ...newChronicles[chronId].qcs, action.payload.id ])
    }}
  }

  return { ...state,
    qcs: { ...state.qcs, ...newQcs },
    players: { ...state.players, [owner.id]: { ...owner, qcs: [ ...owner.qcs, action.payload.id ] }},
    chronicles: newChronicles,
    qc_merits:  { ...state.qc_merits,  ...newQcMerits   },
    qc_attacks: { ...state.qc_attacks, ...newQcAttacks  }
  }
}
