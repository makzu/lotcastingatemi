import { callApi } from '../../utils/api.js'

const CHM_CREATE =             'lca/charm/CREATE'
const CHM_CREATE_SUCCESS =     'lca/charm/CREATE_SUCCESS'
const CHM_CREATE_FAILURE =     'lca/charm/CREATE_FAILURE'
const CHM_UPDATE =             'lca/charm/UPDATE'
const CHM_UPDATE_SUCCESS =     'lca/charm/UPDATE_SUCCESS'
const CHM_UPDATE_FAILURE =     'lca/charm/UPDATE_FAILURE'
const CHM_DESTROY =            'lca/charm/DESTROY'
const CHM_DESTROY_SUCCESS =    'lca/charm/DESTROY_SUCCESS'
const CHM_DESTROY_FAILURE =    'lca/charm/DESTROY_FAILURE'

function normalized_type(type) {
  switch(type) {
  case 'SolarCharm':
    return 'solar_charms'
  case 'MartialArtsCharm':
    return 'martial_arts_charms'
  case 'Evocation':
    return 'evocations'
  }
}

export default function reducer(state, action) {
  const _id = action.payload != undefined ? action.payload.id : null
  const _charId = action.payload != undefined ? action.payload.character_id : null
  const _trait = action.meta != undefined ? action.meta.trait : null
  const _type = action.payload != undefined ? normalized_type(action.payload.type) : null

  switch(action.type) {
  case CHM_CREATE_SUCCESS:
    return { ...state,
      charms: { ...state.charms, [_id]: action.payload },
      characters: {
        ...state.characters,
        [_charId]: { ...state.characters[_charId], [_type]: [...state.characters[_charId][_type], _id] }
      }
    }
  case CHM_UPDATE_SUCCESS:
    return { ...state, charms: {
      ...state.charms, [_id]: {
        ...state.charms[_id], [_trait]: action.payload[_trait] }}
    }
  case CHM_DESTROY_SUCCESS:
    return _destroy_charm(state, action)
  default:
    return state
  }
}

export function createCharm(charId, type) {
  let charm = { charm: { character_id: charId, type: type }}

  return callApi({
    endpoint: `/api/v1/characters/${charId}/charms`,
    method: 'POST',
    body: JSON.stringify(charm),
    types: [CHM_CREATE, CHM_CREATE_SUCCESS, CHM_CREATE_FAILURE]
  })
}

export function updateCharm(id, charId, trait, value) {
  let charm = { charm: { [trait]: value }}

  return callApi({
    endpoint: `/api/v1/characters/${charId}/charms/${id}`,
    method: 'PATCH',
    body: JSON.stringify(charm),
    types: [
      CHM_UPDATE,
      { type: CHM_UPDATE_SUCCESS, meta: { trait: trait }},
      CHM_UPDATE_FAILURE
    ]
  })
}

export function destroyCharm(id, charId) {
  return callApi({
    endpoint: `/api/v1/characters/${charId}/charms/${id}`,
    method: 'DELETE',
    types: [
      CHM_DESTROY,
      { type: CHM_DESTROY_SUCCESS, meta: { id: id, charId: charId }},
      CHM_DESTROY_FAILURE
    ]
  })
}

function _destroy_charm(state, action) {
  const id = action.meta.id
  const charId = action.meta.charId
  const type = normalized_type(action.payload.type)

  const newCharms = { ...state.charms }

  delete newCharms[id]

  const char = { ...state.characters[charId] }
  char[type] = char[type].filter((e) => e != id)

  return { ...state, charms: newCharms, characters: { ...state.characters, [charId]: char }}
}
