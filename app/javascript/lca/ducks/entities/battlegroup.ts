import { createSelector } from 'reselect'

import { State } from 'ducks'
import { sortOrderSort } from 'utils'
import { callApi } from 'utils/api'
import {
  createApiActions,
  createConditionalFetchAction,
  createEntityReducer,
  mergeEntity,
} from './_entity'
import { crudAction, standardTypes, unwrapped } from './_lib'
import { getCurrentPlayer } from './player'

const BATTLEGROUP = 'battlegroup'

/* *** Reducer *** */
export default createEntityReducer('battlegroup', {
  [crudAction(BATTLEGROUP, 'CREATE_FROM_QC').success.toString()]: mergeEntity,
})

/* *** Actions *** */
export const [
  createBattlegroup,
  duplicateBattlegroup,
  fetchBattlegroup,
  fetchAllBattlegroups,
  updateBattlegroup,
  destroyBattlegroup,
] = createApiActions(BATTLEGROUP)

export function createBattlegroupFromQc(id: number) {
  const action = crudAction(BATTLEGROUP, 'CREATE_FROM_QC')
  return callApi({
    endpoint: `/api/v1/battlegroups/create_from_qc/${id}`,
    types: standardTypes(BATTLEGROUP, action),
  })
}

export const fetchBattlegroupIfNecessary = createConditionalFetchAction(
  BATTLEGROUP,
  fetchBattlegroup,
)

/* *** Selectors *** */
const getBattlegroups = (state: State) => unwrapped(state).battlegroups

export const getMyBattlegroups = createSelector(
  [getCurrentPlayer, getBattlegroups],
  (currentPlayer, battlegroups) =>
    (currentPlayer.battlegroups || [])
      .map((c) => battlegroups[c])
      .sort(sortOrderSort),
)

export const getMyPinnedBattlegroups = createSelector(
  [getMyBattlegroups],
  (battlegroups) => battlegroups.filter((c) => c.pinned),
)

export const getMyBattlegroupsWithoutChronicles = createSelector(
  [getMyBattlegroups],
  (battlegroups) => battlegroups.filter((c) => c.chronicle_id == null),
)

export const getSpecificBattlegroup = (state: State, id: number) =>
  unwrapped(state).battlegroups[id]
