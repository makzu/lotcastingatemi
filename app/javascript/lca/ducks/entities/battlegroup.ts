import { createAction } from '@reduxjs/toolkit'
import { createSelector } from 'reselect'

import type { RootState } from '@/store'
import { sortOrderSort } from '@/utils'
import { callApi } from '@/utils/api'
import {
  createApiActions,
  createConditionalFetchAction,
  createEntityReducer,
  mergeEntity,
} from './_entity'
import { crudAction, standardTypes, unwrapped } from './_lib'
import { EntityState } from './_types'
import { getCurrentPlayer } from './player'

const BATTLEGROUP = 'battlegroup'
const isDefined = <T>(value: T | undefined): value is T => value !== undefined

export const updateBattlegroupSort = createAction<{
  id: number
  sorting: number
}>('sort/battlegroup')

export const updateBattlegroupChronicleSort = createAction<{
  id: number
  sorting: number
}>('chronicle_sort/battlegroup')

/* *** Reducer *** */
export default createEntityReducer('battlegroup', {
  [crudAction(BATTLEGROUP, 'CREATE_FROM_QC').success.toString()]: mergeEntity,
  [updateBattlegroupSort.toString()]: (
    state: EntityState,
    action: ReturnType<typeof updateBattlegroupSort>,
  ) => {
    const { id, sorting } = action.payload
    state.battlegroups[id].sorting = sorting
  },
  [updateBattlegroupChronicleSort.toString()]: (
    state: EntityState,
    action: ReturnType<typeof updateBattlegroupChronicleSort>,
  ) => {
    const { id, sorting } = action.payload
    state.battlegroups[id].chronicle_sorting = sorting
  },
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
const getBattlegroups = (state: RootState) => unwrapped(state).battlegroups

export const getMyBattlegroups = createSelector(
  [getCurrentPlayer, getBattlegroups],
  (currentPlayer, battlegroups) =>
    (currentPlayer?.battlegroups ?? [])
      .map((c) => battlegroups[c])
      .filter(isDefined)
      .sort(sortOrderSort),
)

export const getSpecificBattlegroup = (state: RootState, id: number) =>
  unwrapped(state).battlegroups[id]

export const doIOwnBattlegroup = createSelector(
  [getCurrentPlayer, getSpecificBattlegroup],
  (player, character) => character != null && player.id === character.player_id,
)

export const getMyPinnedBattlegroups = createSelector(
  [getMyBattlegroups],
  (battlegroups) => battlegroups.filter((c) => c.pinned),
)

export const getMyBattlegroupsWithoutChronicles = createSelector(
  [getMyBattlegroups],
  (battlegroups) => battlegroups.filter((c) => c.chronicle_id == null),
)

export const amIStOfBattlegroup = createSelector(
  [getCurrentPlayer, getSpecificBattlegroup, unwrapped],
  (player, character, state) =>
    state.chronicles[character?.chronicle_id ?? 0]?.st_id === player?.id,
)

export const canIDeleteBattlegroup = doIOwnBattlegroup

export const canIEditBattlegroup = createSelector(
  [doIOwnBattlegroup, amIStOfBattlegroup],
  (doI, amI) => doI || amI,
)
