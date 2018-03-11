import { callApi } from '../../utils/api.js'

const MRT_CREATE =             'lca/merit/CREATE'
const MRT_CREATE_SUCCESS =     'lca/merit/CREATE_SUCCESS'
const MRT_CREATE_FAILURE =     'lca/merit/CREATE_FAILURE'
const MRT_UPDATE =             'lca/merit/UPDATE'
const MRT_UPDATE_SUCCESS =     'lca/merit/UPDATE_SUCCESS'
const MRT_UPDATE_FAILURE =     'lca/merit/UPDATE_FAILURE'
const MRT_DESTROY =            'lca/merit/DESTROY'
const MRT_DESTROY_SUCCESS =    'lca/merit/DESTROY_SUCCESS'
const MRT_DESTROY_FAILURE =    'lca/merit/DESTROY_FAILURE'

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
      { type: MRT_UPDATE_SUCCESS, meta: { id: id, trait: trait }},
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
