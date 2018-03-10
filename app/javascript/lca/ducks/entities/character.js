import { callApi } from '../../utils/api.js'

export const CHA_CREATE =          'lca/character/CREATE'
export const CHA_CREATE_SUCCESS =  'lca/character/CREATE_SUCCESS'
export const CHA_CREATE_FAILURE =  'lca/character/CREATE_FAILURE'
export const CHA_UPDATE =          'lca/character/UPDATE'
export const CHA_UPDATE_SUCCESS =  'lca/character/UPDATE_SUCCESS'
export const CHA_UPDATE_FAILURE =  'lca/character/UPDATE_FAILURE'
export const CHA_DESTROY =         'lca/character/DESTROY'
export const CHA_DESTROY_SUCCESS = 'lca/character/DESTROY_SUCCESS'
export const CHA_DESTROY_FAILURE = 'lca/character/DESTROY_FAILURE'

export function createCharacter(char) {
  return callApi({
    endpoint: '/api/v1/characters',
    method: 'POST',
    body: JSON.stringify({ character: char }),
    types: [CHA_CREATE, CHA_CREATE_SUCCESS, CHA_CREATE_FAILURE]
  })
}

export function updateCharacter(id, trait, value) {
  return callApi({
    endpoint: `/api/v1/characters/${id}`,
    method: 'PATCH',
    body: JSON.stringify({ character: { [trait]: value }}),
    types: [
      CHA_UPDATE,
      { type: CHA_UPDATE_SUCCESS, meta: { id: id, trait: trait }},
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
