import { callApi } from '../utils/api.js'

const FETCH =              'lca/merit/FETCH'
const FETCH_SUCCESS =      'lca/merit/FETCH_SUCCESS'
const FETCH_FAILURE =      'lca/merit/FETCH_FAILURE'
const UPDATE =             'lca/merit/UPDATE'
const UPDATE_SUCCESS =     'lca/merit/UPDATE_SUCCESS'
const UPDATE_FAILURE =     'lca/merit/UPDATE_FAILURE'
const CREATE =             'lca/merit/CREATE'
const CREATE_SUCCESS =     'lca/merit/CREATE_SUCCESS'
const CREATE_FAILURE =     'lca/merit/CREATE_FAILURE'
const DESTROY =            'lca/merit/DESTROY'
const DESTROY_SUCCESS =    'lca/merit/DESTROY_SUCCESS'
const DESTROY_FAILURE =    'lca/merit/DESTROY_FAILURE'

export default function reducer(state, action) {
  const _id = action.payload != undefined ? action.payload.id : null
  const _charId = action.payload != undefined ? action.payload.character_id : null
  const _trait = action.meta != undefined ? action.meta.trait : null

  switch(action.type) {
  case CREATE_SUCCESS:
    return { ...state,
      merits: { ...state.merits, [_id]: action.payload },
      characters: {
        ...state.characters,
        [_charId]: { ...state.characters[_charId], merits: [...state.characters[_charId].merits, _id] }
      }
    }
  case UPDATE_SUCCESS:
    return { ...state, merits: {
      ...state.merits, [_id]: {
        ...state.merits[_id], [_trait]: action.payload[_trait] }}
    }
  case DESTROY_SUCCESS:
    return _destroy_merit(state, action)
  default:
    return state
  }
}

export function createMerit(charId) {
  let merit = { merit: { character_id: charId }}

  return callApi({
    endpoint: `/api/v1/characters/${charId}/merits`,
    method: 'POST',
    body: JSON.stringify(merit),
    types: [CREATE, CREATE_SUCCESS, CREATE_FAILURE]
  })
}

export function updateMerit(id, charId, trait, value) {
  let merit = { merit: { [trait]: value }}

  return callApi({
    endpoint: `/api/v1/characters/${charId}/merits/${id}`,
    method: 'PATCH',
    body: JSON.stringify(merit),
    types: [
      UPDATE,
      { type: UPDATE_SUCCESS, meta: { trait: trait }},
      UPDATE_FAILURE
    ]
  })
}

export function destroyMerit(id, charId) {
  return callApi({
    endpoint: `/api/v1/characters/${charId}/merits/${id}`,
    method: 'DELETE',
    types: [
      DESTROY,
      { type: DESTROY_SUCCESS, meta: { id: id, charId: charId }},
      DESTROY_FAILURE
    ]
  })
}

function _destroy_merit(state, action) {
  const id = action.meta.id
  const charId = action.meta.charId

  const newMerits = { ...state.merits }

  delete newMerits[id]

  const char = { ...state.characters[charId] }
  char.merits = char.merits.filter((e) => e != id)

  return { ...state, merits: newMerits, characters: { ...state.characters, [charId]: char }}
}
