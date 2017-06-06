import { callApi } from '../utils/api.js'

const UPDATE =             'lca/weapon/UPDATE'
const UPDATE_SUCCESS =     'lca/weapon/UPDATE_SUCCESS'
const UPDATE_FAILURE =     'lca/weapon/UPDATE_FAILURE'
const CREATE =             'lca/weapon/CREATE'
const CREATE_SUCCESS =     'lca/weapon/CREATE_SUCCESS'
const CREATE_FAILURE =     'lca/weapon/CREATE_FAILURE'
const DESTROY =            'lca/weapon/DESTROY'
const DESTROY_SUCCESS =    'lca/weapon/DESTROY_SUCCESS'
const DESTROY_FAILURE =    'lca/weapon/DESTROY_FAILURE'

export default function reducer(state, action) {
  const _id = action.payload != undefined ? action.payload.id : null
  const _charId = action.payload != undefined ? action.payload.character_id : null
  const _trait = action.meta != undefined ? action.meta.trait : null

  switch(action.type) {
  case CREATE_SUCCESS:
    return { ...state,
      weapons: { ...state.weapons, [_id]: action.payload },
      characters: {
        ...state.characters,
        [_charId]: { ...state.characters[_charId], weapons: [...state.characters[_charId].weapons, _id] }
      }
    }
  case UPDATE_SUCCESS:
    return { ...state, weapons: {
      ...state.weapons, [_id]: {
        ...state.weapons[_id], [_trait]: action.payload[_trait] }}
    }
  case DESTROY_SUCCESS:
    return _destroy_weapon(state, action)
  default:
    return state
  }
}

export function createWeapon(charId) {
  let weapon = { weapon: { character_id: charId }}

  return callApi({
    endpoint: `/api/v1/characters/${charId}/weapons`,
    method: 'POST',
    body: JSON.stringify(weapon),
    types: [CREATE, CREATE_SUCCESS, CREATE_FAILURE]
  })
}

export function updateWeapon(id, charId, trait, value) {
  let weapon = { weapon: { [trait]: value }}

  return callApi({
    endpoint: `/api/v1/characters/${charId}/weapons/${id}`,
    method: 'PATCH',
    body: JSON.stringify(weapon),
    types: [
      UPDATE,
      { type: UPDATE_SUCCESS, meta: { trait: trait }},
      UPDATE_FAILURE
    ]
  })
}

export function destroyWeapon(id, charId) {
  return callApi({
    endpoint: `/api/v1/characters/${charId}/weapons/${id}`,
    method: 'DELETE',
    types: [
      DESTROY,
      { type: DESTROY_SUCCESS, meta: { id: id, charId: charId }},
      DESTROY_FAILURE
    ]
  })
}

function _destroy_weapon(state, action) {
  const id = action.meta.id
  const charId = action.meta.charId

  const newWeapons = { ...state.weapons }

  delete newWeapons[id]

  const char = { ...state.characters[charId] }
  char.weapons = char.weapons.filter((e) => e != id)

  return { ...state, weapons: newWeapons, characters: { ...state.characters, [charId]: char }}
}
