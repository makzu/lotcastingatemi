import { createSelector } from 'reselect'
import createCachedSelector from 're-reselect'
import { getQcAttacks } from './qc'
import { bgJoinBattlePool } from '../utils/calculated/_battlegroups'

import { entities, getCurrentPlayer } from './entities'
import type { WrappedEntityState } from 'ducks/entities'
import { isDefined } from 'utils'

export const getSpecificBattlegroup = (state: WrappedEntityState, id: number) =>
  entities(state).battlegroups[id]

export const getAttacksForBattlegroup = createCachedSelector(
  [getSpecificBattlegroup, getQcAttacks],
  (bg, attacks) =>
    (bg?.qc_attacks ?? []).map((m) => attacks[m]).filter(isDefined),
)((state, id) => id)

export const doIOwnBattlegroup = createSelector(
  [getCurrentPlayer, getSpecificBattlegroup],
  (player, battlegroup) =>
    battlegroup !== undefined && player.id === battlegroup.player_id,
)

export const amIStOfBattlegroup = createSelector(
  [getCurrentPlayer, getSpecificBattlegroup, entities],
  (player, battlegroup, ents) =>
    battlegroup?.chronicle_id != null &&
    ents.chronicles[battlegroup.chronicle_id] &&
    ents.chronicles[battlegroup.chronicle_id].st_id === player.id,
)

export const canISeeBattlegroup = createSelector(
  [getSpecificBattlegroup, doIOwnBattlegroup, amIStOfBattlegroup],
  (battlegroup, doI, amI) => !battlegroup.hidden || doI || amI,
)

export const canIEditBattlegroup = createSelector(
  [doIOwnBattlegroup, amIStOfBattlegroup],
  (doI, amI) => doI || amI,
)

export const canIDeleteBattlegroup = doIOwnBattlegroup
export const getPoolsAndRatingsForBattlegroup = (
  state: WrappedEntityState,
  id: number,
) => ({
  joinBattle: bgJoinBattlePool(getSpecificBattlegroup(state, id)),
})
