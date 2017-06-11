import { callApi } from '../../utils/api.js'

const MRT_CREATE =             'lca/merit/CREATE'
const MRT_CREATE_SUCCESS =     'lca/merit/CREATE_SUCCESS'
const MRT_CREATE_FAILURE =     'lca/merit/CREATE_FAILURE'
//const MRT_FETCH =              'lca/merit/FETCH'
//const MRT_FETCH_SUCCESS =      'lca/merit/FETCH_SUCCESS'
//const MRT_FETCH_FAILURE =      'lca/merit/FETCH_FAILURE'
const MRT_UPDATE =             'lca/merit/UPDATE'
const MRT_UPDATE_SUCCESS =     'lca/merit/UPDATE_SUCCESS'
const MRT_UPDATE_FAILURE =     'lca/merit/UPDATE_FAILURE'
const MRT_DESTROY =            'lca/merit/DESTROY'
const MRT_DESTROY_SUCCESS =    'lca/merit/DESTROY_SUCCESS'
const MRT_DESTROY_FAILURE =    'lca/merit/DESTROY_FAILURE'

export default function reducer(state, action) {
  const _id = action.payload != undefined ? action.payload.id : null
  const _charId = action.payload != undefined ? action.payload.character_id : null
  const _trait = action.meta != undefined ? action.meta.trait : null

  switch(action.type) {
  case MRT_CREATE_SUCCESS:
    return { ...state,
      merits: { ...state.merits, [_id]: action.payload },
      characters: {
        ...state.characters,
        [_charId]: { ...state.characters[_charId], merits: [...state.characters[_charId].merits, _id] }
      }
    }
  case MRT_UPDATE_SUCCESS:
    return { ...state, merits: {
      ...state.merits, [_id]: {
        ...state.merits[_id], [_trait]: action.payload[_trait] }}
    }
  case MRT_DESTROY_SUCCESS:
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
    types: [MRT_CREATE, MRT_CREATE_SUCCESS, MRT_CREATE_FAILURE]
  })
}

export function updateMerit(id, charId, trait, value) {
  let merit = { merit: { [trait]: value }}

  return callApi({
    endpoint: `/api/v1/characters/${charId}/merits/${id}`,
    method: 'PATCH',
    body: JSON.stringify(merit),
    types: [
      MRT_UPDATE,
      { type: MRT_UPDATE_SUCCESS, meta: { trait: trait }},
      MRT_UPDATE_FAILURE
    ]
  })
}

export function destroyMerit(id, charId) {
  return callApi({
    endpoint: `/api/v1/characters/${charId}/merits/${id}`,
    method: 'DELETE',
    types: [
      MRT_DESTROY,
      { type: MRT_DESTROY_SUCCESS, meta: { id: id, charId: charId }},
      MRT_DESTROY_FAILURE
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
