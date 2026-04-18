import { createSelector } from 'reselect'
import createCachedSelector from 're-reselect'

import { getQcAttacks } from './qc'
import { bgJoinBattlePool } from '../utils/calculated/_battlegroups'
import { entities, getCurrentPlayer } from './entities'
import type { Player, Battlegroup } from 'types'
import { RootState } from 'store'

export const getSpecificBattlegroup = (
  state: RootState,
  id: number,
): Battlegroup => entities(state).battlegroups[id]

export const getAttacksForBattlegroup = createCachedSelector(
  [getSpecificBattlegroup, getQcAttacks],
  (bg, attacks) => bg.qc_attacks.map((m) => attacks[m]),
)((state, id) => id)

export const doIOwnBattlegroup = createSelector(
  [getCurrentPlayer, getSpecificBattlegroup],
  (player: Player, battlegroup: Battlegroup) =>
    battlegroup !== undefined && player.id === battlegroup.player_id,
)

export const amIStOfBattlegroup = createSelector(
  [getCurrentPlayer, getSpecificBattlegroup, entities],
  (player, battlegroup, ents) =>
    battlegroup !== undefined &&
    battlegroup.chronicle_id != null &&
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
  state: RootState,
  id: number,
) => ({
  joinBattle: bgJoinBattlePool(getSpecificBattlegroup(state, id)),
})
