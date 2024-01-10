import { createSelector } from 'reselect'
import createCachedSelector from 're-reselect'
import { getQcAttacks } from './qc'
import { bgJoinBattlePool } from '../utils/calculated/_battlegroups'
import type { entitySelector } from './entities'
import { entities, getCurrentPlayer } from './entities'
import type { WrappedEntityState } from 'ducks/entities'
import type { Player, Battlegroup } from 'utils/flow-types'
export const getSpecificBattlegroup = (
  state: WrappedEntityState,
  id: number,
): Battlegroup => entities(state).battlegroups[id]
// @ts-expect-error
export const getAttacksForBattlegroup: getAttacks = createCachedSelector(
  [getSpecificBattlegroup, getQcAttacks],
  (bg, attacks) => bg.qc_attacks.map((m) => attacks[m]),
)((state, id) => id)
export const doIOwnBattlegroup: entitySelector<boolean> = createSelector(
  [getCurrentPlayer, getSpecificBattlegroup],
  (player: Player, battlegroup: Battlegroup) =>
    battlegroup !== undefined && player.id === battlegroup.player_id,
)
export const amIStOfBattlegroup: entitySelector<boolean> = createSelector(
  [getCurrentPlayer, getSpecificBattlegroup, entities],
  (player, battlegroup, ents) =>
    battlegroup?.chronicle_id != null &&
    ents.chronicles[battlegroup.chronicle_id] &&
    ents.chronicles[battlegroup.chronicle_id].st_id === player.id,
)
export const canISeeBattlegroup: entitySelector<boolean> = createSelector(
  [getSpecificBattlegroup, doIOwnBattlegroup, amIStOfBattlegroup],
  (battlegroup, doI, amI) => !battlegroup.hidden || doI || amI,
)
export const canIEditBattlegroup: entitySelector<boolean> = createSelector(
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
