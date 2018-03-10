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
      { type: WEP_UPDATE_SUCCESS, meta: { id: id, trait: trait }},
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
