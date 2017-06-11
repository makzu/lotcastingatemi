import { callApi } from '../../utils/api.js'

const WEP_CREATE =             'lca/weapon/CREATE'
const WEP_CREATE_SUCCESS =     'lca/weapon/CREATE_SUCCESS'
const WEP_CREATE_FAILURE =     'lca/weapon/CREATE_FAILURE'
const WEP_UPDATE =             'lca/weapon/UPDATE'
const WEP_UPDATE_SUCCESS =     'lca/weapon/UPDATE_SUCCESS'
const WEP_UPDATE_FAILURE =     'lca/weapon/UPDATE_FAILURE'
const WEP_DESTROY =            'lca/weapon/DESTROY'
const WEP_DESTROY_SUCCESS =    'lca/weapon/DESTROY_SUCCESS'
const WEP_DESTROY_FAILURE =    'lca/weapon/DESTROY_FAILURE'

export default function reducer(state, action) {
  const _id = action.payload != undefined ? action.payload.id : null
  const _charId = action.payload != undefined ? action.payload.character_id : null
  const _trait = action.meta != undefined ? action.meta.trait : null

  switch(action.type) {
  case WEP_CREATE_SUCCESS:
    return { ...state,
      weapons: { ...state.weapons, [_id]: action.payload },
      characters: {
        ...state.characters,
        [_charId]: { ...state.characters[_charId], weapons: [...state.characters[_charId].weapons, _id] }
      }
    }
  case WEP_UPDATE_SUCCESS:
    return { ...state, weapons: {
      ...state.weapons, [_id]: {
        ...state.weapons[_id], [_trait]: action.payload[_trait] }}
    }
  case WEP_DESTROY_SUCCESS:
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
    types: [WEP_CREATE, WEP_CREATE_SUCCESS, WEP_CREATE_FAILURE]
  })
}

export function updateWeapon(id, charId, trait, value) {
  let weapon = { weapon: { [trait]: value }}

  return callApi({
    endpoint: `/api/v1/characters/${charId}/weapons/${id}`,
    method: 'PATCH',
    body: JSON.stringify(weapon),
    types: [
      WEP_UPDATE,
      { type: WEP_UPDATE_SUCCESS, meta: { trait: trait }},
      WEP_UPDATE_FAILURE
    ]
  })
}

export function destroyWeapon(id, charId) {
  return callApi({
    endpoint: `/api/v1/characters/${charId}/weapons/${id}`,
    method: 'DELETE',
    types: [
      WEP_DESTROY,
      { type: WEP_DESTROY_SUCCESS, meta: { id: id, charId: charId }},
      WEP_DESTROY_FAILURE
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
