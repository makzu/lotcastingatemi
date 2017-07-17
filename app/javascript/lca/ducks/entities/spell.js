import { callApi } from '../../utils/api.js'

const SPL_CREATE =             'lca/spell/CREATE'
const SPL_CREATE_SUCCESS =     'lca/spell/CREATE_SUCCESS'
const SPL_CREATE_FAILURE =     'lca/spell/CREATE_FAILURE'
const SPL_UPDATE =             'lca/spell/UPDATE'
const SPL_UPDATE_SUCCESS =     'lca/spell/UPDATE_SUCCESS'
const SPL_UPDATE_FAILURE =     'lca/spell/UPDATE_FAILURE'
const SPL_DESTROY =            'lca/spell/DESTROY'
const SPL_DESTROY_SUCCESS =    'lca/spell/DESTROY_SUCCESS'
const SPL_DESTROY_FAILURE =    'lca/spell/DESTROY_FAILURE'

export default function reducer(state, action) {
  const _id = action.payload != undefined ? action.payload.id : null
  const _charId = action.payload != undefined ? action.payload.character_id : null
  const _trait = action.meta != undefined ? action.meta.trait : null

  switch(action.type) {
  case SPL_CREATE_SUCCESS:
    return { ...state,
      spells: { ...state.spells, [_id]: action.payload },
      characters: {
        ...state.characters,
        [_charId]: { ...state.characters[_charId], spells: [...state.characters[_charId].spells, _id] }
      }
    }
  case SPL_UPDATE_SUCCESS:
    return { ...state, spells: {
      ...state.spells, [_id]: {
        ...state.spells[_id], [_trait]: action.payload[_trait] }}
    }
  case SPL_DESTROY_SUCCESS:
    return _destroy_spell(state, action)
  default:
    return state
  }
}

export function createSpell(charId) {
  let spell = { spell: { character_id: charId }}

  return callApi({
    endpoint: `/api/v1/characters/${charId}/spells`,
    method: 'POST',
    body: JSON.stringify(spell),
    types: [SPL_CREATE, SPL_CREATE_SUCCESS, SPL_CREATE_FAILURE]
  })
}

export function updateSpell(id, charId, trait, value) {
  let spell = { spell: { [trait]: value }}

  return callApi({
    endpoint: `/api/v1/characters/${charId}/spells/${id}`,
    method: 'PATCH',
    body: JSON.stringify(spell),
    types: [
      SPL_UPDATE,
      { type: SPL_UPDATE_SUCCESS, meta: { trait: trait }},
      SPL_UPDATE_FAILURE
    ]
  })
}

export function destroySpell(id, charId) {
  return callApi({
    endpoint: `/api/v1/characters/${charId}/spells/${id}`,
    method: 'DELETE',
    types: [
      SPL_DESTROY,
      { type: SPL_DESTROY_SUCCESS, meta: { id: id, charId: charId }},
      SPL_DESTROY_FAILURE
    ]
  })
}

function _destroy_spell(state, action) {
  const id = action.meta.id
  const charId = action.meta.charId

  const newSpells = { ...state.spells }

  delete newSpells[id]

  const char = { ...state.characters[charId] }
  char.spells = char.spells.filter((e) => e != id)

  return { ...state, spells: newSpells, characters: { ...state.characters, [charId]: char }}
}
