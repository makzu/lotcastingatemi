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
      { type: SPL_UPDATE_SUCCESS, meta: { id: id, trait: trait }},
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
