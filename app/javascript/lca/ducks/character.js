import { normalize } from 'normalizr'
import { getJSON } from 'redux-api-middleware'

import * as schemas from '../reducers/entities/_schemas.js'
import { callApi } from '../utils/api.js'

const CREATE =          'lca/character/CREATE'
const CREATE_SUCCESS =  'lca/character/CREATE_SUCCESS'
const CREATE_FAILURE =  'lca/character/CREATE_FAILURE'
const FETCH =           'lca/character/FETCH'
const FETCH_SUCCESS =   'lca/character/FETCH_SUCCESS'
const FETCH_FAILURE =   'lca/character/FETCH_FAILURE'
const UPDATE =          'lca/character/UPDATE'
const UPDATE_SUCCESS =  'lca/character/UPDATE_SUCCESS'
const UPDATE_FAILURE =  'lca/character/UPDATE_FAILURE'
const DESTROY =         'lca/character/DESTROY'
const DESTROY_SUCCESS = 'lca/character/DESTROY_SUCCESS'
const DESTROY_FAILURE = 'lca/character/DESTROY_FAILURE'

export default function reducer(state, action) {
  const _id = action.payload != undefined ? action.payload.id : null
  const _trait = action.meta != undefined ? action.meta.trait : null

  switch(action.type) {
  case CREATE_SUCCESS:
    return _create_character(state, action)
  case FETCH_SUCCESS:
    return {
      ...state,
      characters: { ...state.characters, ...action.payload.entities.characters },
      weapons:    { ...state.weapons,    ...action.payload.entities.weapons    },
      merits:     { ...state.merits,     ...action.payload.entities.merits     }
    }
  case UPDATE_SUCCESS:
    return { ...state, characters: {
      ...state.characters, [_id]: {
        ...state.characters[_id], [_trait]: action.payload[_trait]
      }
    }}
  case DESTROY_SUCCESS:
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
    types: [CREATE, CREATE_SUCCESS, CREATE_FAILURE]
  })
}

export function fetchCharacter(id) {
  return callApi({
    endpoint: `/api/v1/characters/${id}`,
    method: 'GET',
    types: [
      FETCH,
      {
        type: FETCH_SUCCESS,
        payload: (action, state, res) => {
          return getJSON(res).then((json) => normalize(json, schemas.player))
        }
      },
      FETCH_FAILURE
    ]
  })
}

export function updateCharacter(id, trait, value) {
  return callApi({
    endpoint: `/api/v1/characters/${id}`,
    method: 'PATCH',
    body: JSON.stringify({ character: { [trait]: value }}),
    types: [
      UPDATE,
      { type: UPDATE_SUCCESS, meta: { trait: trait }},
      UPDATE_FAILURE
    ]
  })
}

export function destroyCharacter(id) {
  return callApi({
    endpoint: `/api/v1/characters/${id}`,
    method: 'DELETE',
    types: [
      DESTROY,
      { type: DESTROY_SUCCESS, meta: { id: id }},
      DESTROY_FAILURE
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
