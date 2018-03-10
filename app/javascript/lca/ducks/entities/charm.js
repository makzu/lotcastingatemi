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
      { type: CHM_UPDATE_SUCCESS, meta: { id: id, trait: trait }},
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
