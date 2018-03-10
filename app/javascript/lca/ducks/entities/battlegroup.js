import { callApi } from '../../utils/api.js'

const CREATE =           'lca/battlegroup/CREATE'
const CREATE_SUCCESS =   'lca/battlegroup/CREATE_SUCCESS'
const CREATE_FAILURE =   'lca/battlegroup/CREATE_FAILURE'
const UPDATE =           'lca/battlegroup/UPDATE'
const UPDATE_SUCCESS =   'lca/battlegroup/UPDATE_SUCCESS'
const UPDATE_FAILURE =   'lca/battlegroup/UPDATE_FAILURE'
const DESTROY =          'lca/battlegroup/DESTROY'
const DESTROY_SUCCESS =  'lca/battlegroup/DESTROY_SUCCESS'
const DESTROY_FAILURE =  'lca/battlegroup/DESTROY_FAILURE'

export function createBattlegroup(bg) {
  return callApi({
    endpoint: `/api/v1/battlegroups`,
    method: 'POST',
    body: JSON.stringify({ battlegroup: bg }),
    types: [CREATE, CREATE_SUCCESS, CREATE_FAILURE]
  })
}

export function updateBattlegroup(id, trait, value) {
  let group = { battlegroup: { [trait]: value }}

  return callApi({
    endpoint: `/api/v1/battlegroups/${id}`,
    method: 'PATCH',
    body: JSON.stringify(group),
    types: [
      UPDATE,
      { type: UPDATE_SUCCESS, meta: { id: id, trait: trait }},
      UPDATE_FAILURE
    ]
  })
}

export function destroyBattlegroup(id) {
  return callApi({
    endpoint: `/api/v1/battlegroups/${id}`,
    method: 'DELETE',
    types: [
      DESTROY,
      { type: DESTROY_SUCCESS, meta: { id: id }},
      DESTROY_FAILURE
    ]
  })
}
