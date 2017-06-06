import { normalize } from 'normalizr'
import * as schemas from '../reducers/entities/_schemas.js'
import { callApi } from '../utils/api.js'

const FETCH =         'lca/chronicle/FETCH'
const FETCH_SUCCESS = 'lca/chronicle/FETCH_SUCCESS'
const FETCH_FAILURE = 'lca/chronicle/FETCH_FAILURE'

export default function reducer(state, action) {
  switch(action.type) {
  case FETCH_SUCCESS:
    return _receive_chronicle(state, action)
  default:
    return state
  }
}

export function fetchChronicle(id) {
  return callApi({
    endpoint: `/api/v1/chronicles/${id}`,
    method: 'GET',
    types: [FETCH, FETCH_SUCCESS, FETCH_FAILURE]
  })
}

function _receive_chronicle(state, action) {
  const newState = normalize(action.payload, schemas.chronicle)

  const id = newState.result
  const newChronicles = newState.entities.chronicles
  const newPlayers = newState.entities.players
  const newCharacters = newState.entities.characters
  const newWeapons = newState.entities.weapons
  const newMerits = newState.entities.merits
  const newQcs = newState.entities.qcs
  const newQcMerits = newState.entities.qcMerits
  const newQcAttacks = newState.entities.qcAttacks

  newChronicles[id].characters = []
  newChronicles[id].qcs = []

  for (var plId in newPlayers) {
    newPlayers[plId].characters = []
    newPlayers[plId].qcs = []
  }

  for (var charId in newCharacters) {
    if (newCharacters[charId].chronicle_id == id)
      newChronicles[id].characters.push(parseInt(charId))
    newPlayers[newCharacters[charId].player_id].characters.push(parseInt(charId))
  }
  for (var qcId in newQcs) {
    if (newQcs[qcId].chronicle_id == id)
      newChronicles[id].qcs.push(parseInt(qcId))
    newPlayers[newQcs[qcId].player_id].qcs.push(parseInt(qcId))
  }

  return {
    characters: { ...state.characters, ...newCharacters },
    players:    { ...state.players,    ...newPlayers    },
    merits:     { ...state.merits,     ...newMerits     },
    weapons:    { ...state.weapons,    ...newWeapons    },
    qcs:        { ...state.qcs,        ...newQcs        },
    qc_merits:  { ...state.qc_merits,  ...newQcMerits   },
    qc_attacks: { ...state.qc_attacks, ...newQcAttacks  },
    chronicles: { ...state.chronicles, ...newChronicles }
  }
}
