import { normalize } from 'normalizr'

import { callApi } from '../../utils/api.js'
import * as schemas from './_schemas.js'

const CREATE =           'lca/battlegroup/CREATE'
const CREATE_SUCCESS =   'lca/battlegroup/CREATE_SUCCESS'
const CREATE_FAILURE =   'lca/battlegroup/CREATE_FAILURE'
const UPDATE =           'lca/battlegroup/UPDATE'
const UPDATE_SUCCESS =   'lca/battlegroup/UPDATE_SUCCESS'
const UPDATE_FAILURE =   'lca/battlegroup/UPDATE_FAILURE'
const DESTROY =          'lca/battlegroup/DESTROY'
const DESTROY_SUCCESS =  'lca/battlegroup/DESTROY_SUCCESS'
const DESTROY_FAILURE =  'lca/battlegroup/DESTROY_FAILURE'

export default function reducer(state, action) {
  const _id = action.payload != undefined ? action.payload.id : null
  const _trait = action.meta != undefined ? action.meta.trait : null

  switch(action.type) {
  case CREATE_SUCCESS:
    return _create_battlegroup(state, action)
  case UPDATE_SUCCESS:
    return { ...state, battlegroups: {
      ...state.battlegroups, [_id]: {
        ...state.battlegroups[_id], [_trait]: action.payload[_trait] }}
    }
  case DESTROY_SUCCESS:
    return _destroy_battlegroup(state, action)
  default:
    return state
  }
}

export function createBattlegroup(bg) {
  return callApi({
    endpoint: `/api/v1/battlegroups`,
    method: 'POST',
    body: JSON.stringify({ battlegroup: bg }),
    types: [CREATE, CREATE_SUCCESS, CREATE_FAILURE]
  })
}

export function updateBattlegroup(id, trait, value) {
  let group = { battlegroup: { [trait]: value }}

  return callApi({
    endpoint: `/api/v1/battlegroups/${id}`,
    method: 'PATCH',
    body: JSON.stringify(group),
    types: [
      UPDATE,
      { type: UPDATE_SUCCESS, meta: { trait: trait }},
      UPDATE_FAILURE
    ]
  })
}

export function destroyBattlegroup(id) {
  return callApi({
    endpoint: `/api/v1/battlegroups/${id}`,
    method: 'DELETE',
    types: [
      DESTROY,
      { type: DESTROY_SUCCESS, meta: { id: id }},
      DESTROY_FAILURE
    ]
  })
}

function _create_battlegroup(state, action) {
  const newState = normalize(action.payload, schemas.battlegroup)
  const newBattlegroups = newState.entities.battlegroups
  const owner = state.players[action.payload.player_id]
  const id = action.payload.id

  const chronId = action.payload.chronicle_id
  let newChronicles = state.chronicles

  if (chronId != null) {
    newChronicles = { ...newChronicles, [chronId]: {
      ...newChronicles[chronId],
      battlegroups: [ ...newChronicles[chronId].battlegroups, id ]
    }}
  }

  return { ...state,
    battlegroups: { ...state.battlegroups, ...newBattlegroups },
    players: { ...state.players, [owner.id]: { ...owner, battlegroups: [ ...owner.battlegroups, id ] }},
    chronicles: newChronicles
  }
}

// TODO remove ID from player/chronicle entities
function _destroy_battlegroup(state, action) {
  const id = action.meta.id

  const newBattlegroups = { ...state.battlegroups }

  delete newBattlegroups[id]

  return { ...state, battlegroups: newBattlegroups }
}
