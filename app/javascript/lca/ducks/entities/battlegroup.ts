import { createSelector } from 'reselect'

import {
  createApiActions,
  createConditionalFetchAction,
  createEntityReducer,
  mergeEntity,
} from './_entity'
import { crudAction, standardTypes, unwrapped } from './_lib'
import { getCurrentPlayer } from './player'
import { RootState } from 'store'
import { sortOrderSort } from 'utils'
import { callApi } from 'utils/api'
import { entities } from '@/selectors/entities'

const BATTLEGROUP = 'battlegroup'
const isDefined = <T>(value: T | undefined): value is T => value !== undefined

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
const getBattlegroups = (state: RootState) => unwrapped(state).battlegroups

export const getMyBattlegroups = createSelector(
  [getCurrentPlayer, getBattlegroups],
  (currentPlayer, battlegroups) =>
    (currentPlayer?.battlegroups ?? [])
      .map((c) => battlegroups[c])
      .filter(isDefined)
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

export const getSpecificBattlegroup = (state: RootState, id: number) =>
  unwrapped(state).battlegroups[id]

export const doIOwnBattlegroup = createSelector(
  [getCurrentPlayer, getSpecificBattlegroup],
  (player, character) => character != null && player.id === character.player_id,
)

export const amIStOfBattlegroup = createSelector(
  [getCurrentPlayer, getSpecificBattlegroup, entities],
  (player, battlegroup, ents) =>
    battlegroup?.chronicle_id != null &&
    ents.chronicles[battlegroup.chronicle_id] &&
    ents.chronicles[battlegroup.chronicle_id].st_id === player.id,
)

export const canIEditBattlegroup = createSelector(
  [doIOwnBattlegroup, amIStOfBattlegroup],
  (doI, amI) => doI || amI,
)

export const canIDeleteBattlegroup = doIOwnBattlegroup
