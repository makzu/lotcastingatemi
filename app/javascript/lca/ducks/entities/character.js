import { normalize } from 'normalizr'
import { getJSON } from 'redux-api-middleware'

import * as schemas from './_schemas.js'
import { callApi } from '../../utils/api.js'

export const CHA_CREATE =          'lca/character/CREATE'
export const CHA_CREATE_SUCCESS =  'lca/character/CREATE_SUCCESS'
export const CHA_CREATE_FAILURE =  'lca/character/CREATE_FAILURE'
export const CHA_FETCH =           'lca/character/FETCH'
export const CHA_FETCH_SUCCESS =   'lca/character/FETCH_SUCCESS'
export const CHA_FETCH_FAILURE =   'lca/character/FETCH_FAILURE'
export const CHA_UPDATE =          'lca/character/UPDATE'
export const CHA_UPDATE_SUCCESS =  'lca/character/UPDATE_SUCCESS'
export const CHA_UPDATE_FAILURE =  'lca/character/UPDATE_FAILURE'
export const CHA_DESTROY =         'lca/character/DESTROY'
export const CHA_DESTROY_SUCCESS = 'lca/character/DESTROY_SUCCESS'
export const CHA_DESTROY_FAILURE = 'lca/character/DESTROY_FAILURE'

export default function reducer(state, action) {
  const _id = action.payload != undefined ? action.payload.id : null
  const _trait = action.meta != undefined ? action.meta.trait : null

  switch(action.type) {
  case CHA_CREATE_SUCCESS:
    return _create_character(state, action)
  case CHA_FETCH_SUCCESS:
    return {
      ...state,
      characters: { ...state.characters, ...action.payload.entities.characters },
      weapons:    { ...state.weapons,    ...action.payload.entities.weapons    },
      merits:     { ...state.merits,     ...action.payload.entities.merits     }
    }
  case CHA_UPDATE_SUCCESS:
    return { ...state, characters: {
      ...state.characters, [_id]: {
        ...state.characters[_id], [_trait]: action.payload[_trait]
      }
    }}
  case CHA_DESTROY_SUCCESS:
    return _destroy_char(state, _id)
  default:
    return state
  }
}

export function createCharacter(playerId, chronicleId, name) {
  let char = { character: { name: name, player_id: playerId, chronicle_id: chronicleId }}

  return callApi({
    endpoint: '/api/v1/characters',
    method: 'POST',
    body: JSON.stringify(char),
    types: [CHA_CREATE, CHA_CREATE_SUCCESS, CHA_CREATE_FAILURE]
  })
}

export function fetchCharacter(id) {
  return callApi({
    endpoint: `/api/v1/characters/${id}`,
    method: 'GET',
    types: [
      CHA_FETCH,
      {
        type: CHA_FETCH_SUCCESS,
        payload: (action, state, res) => {
          return getJSON(res).then((json) => normalize(json, schemas.player))
        }
      },
      CHA_FETCH_FAILURE
    ]
  })
}

export function updateCharacter(id, trait, value) {
  return callApi({
    endpoint: `/api/v1/characters/${id}`,
    method: 'PATCH',
    body: JSON.stringify({ character: { [trait]: value }}),
    types: [
      CHA_UPDATE,
      { type: CHA_UPDATE_SUCCESS, meta: { trait: trait }},
      CHA_UPDATE_FAILURE
    ]
  })
}

export function destroyCharacter(id) {
  return callApi({
    endpoint: `/api/v1/characters/${id}`,
    method: 'DELETE',
    types: [
      CHA_DESTROY,
      { type: CHA_DESTROY_SUCCESS, meta: { id: id }},
      CHA_DESTROY_FAILURE
    ]
  })
}

function _create_character(state, action) {
  const newState = normalize(action.payload, schemas.character)
  const newCharacters = newState.entities.characters
  const owner = state.players[action.payload.player_id]

  const chronId = action.payload.chronicle_id
  let newChronicles = state.chronicles

  if (chronId != null) {
    newChronicles = { ...newChronicles, [chronId]: {
      ...newChronicles[chronId],
      characters: [ ...newChronicles[chronId].characters, action.payload.id ]
    }}
  }

  return { ...state,
    characters: { ...state.characters, ...newCharacters },
    players: { ...state.players, [owner.id]: { ...owner, characters: [ ...owner.characters, action.character.id ] }},
    chronicles: newChronicles
  }
}

// TODO cause removal of all attached weapons, merits, etc
function _destroy_char(state, id) {
  const chars = { ...state.characters }

  delete chars[id]

  return { ...state, characters: chars }
}
