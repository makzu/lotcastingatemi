import { createAction } from '@reduxjs/toolkit'
import { getJSON } from 'redux-api-middleware'

import { State } from 'ducks'
import { callApi } from 'utils/api'
import { crudAction, standardTypes } from './_lib'
import { createTraitReducer } from './_trait'

export const updateCharmLoadoutSort = createAction<{
  id: number
  sorting: number
}>('sort/charm_loadout')

export default createTraitReducer('charm_loadout', undefined, {
  [updateCharmLoadoutSort.toString()]: (
    state: State['entities']['current'],
    action: ReturnType<typeof updateCharmLoadoutSort>,
  ) => {
    const { id, sorting } = action.payload
    state.charm_loadouts[id].sorting = sorting
  },
  [crudAction('charm_loadout', 'ADD_CHARM').success.toString()]: (
    state: State['entities']['current'],
    action,
  ) => {
    const { id, charm_id } = action.payload
    state.charm_loadouts[id].charms.push(charm_id)
  },
  [crudAction('charm_loadout', 'REMOVE_CHARM').success.toString()]: (
    state: State['entities']['current'],
    action,
  ) => {
    const { id, charm_id } = action.payload
    state.charm_loadouts[id].charms = state.charm_loadouts[id].charms.filter(
      (c) => c !== charm_id,
    )
  },
})

const justGetJSON = (_0: never, _1: never, response) => getJSON(response)

export function addCharmToLoadout(charmId: number, loadoutId: number) {
  return callApi({
    body: JSON.stringify({ charm_id: charmId }),
    endpoint: `/api/v1/charm_loadouts/${loadoutId}/add_charm`,
    types: standardTypes(
      'charm_loadout',
      crudAction('charm_loadout', 'ADD_CHARM'),
      justGetJSON,
    ),
  })
}

export function removeCharmFromLoadout(charmId: number, loadoutId: number) {
  return callApi({
    body: JSON.stringify({ charm_id: charmId }),
    endpoint: `/api/v1/charm_loadouts/${loadoutId}/remove_charm`,
    types: standardTypes(
      'charm_loadout',
      crudAction('charm_loadout', 'REMOVE_CHARM'),
      justGetJSON,
    ),
  })
}
