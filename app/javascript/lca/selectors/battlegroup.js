import { createSelector } from 'reselect'
import createCachedSelector from 're-reselect'
import { getQcAttacks } from './qc.js'

const getState = (state) => state
const getCurrentPlayer = (state) => state.entities.players[state.session.id]

export const getSpecificBattlegroup = (state, id) => state.entities.battlegroups[id]

export const getAttacksForBattlegroup = createCachedSelector(
  [getSpecificBattlegroup, getQcAttacks],
  (bg, attacks) => bg.qc_attacks.map((m) => attacks[m])
)((state, id) => id)

export const doIOwnBattlegroup = createSelector(
  [getCurrentPlayer, getSpecificBattlegroup],
  (player, battlegroup) => battlegroup !== undefined && player.id === battlegroup.player_id
)

export const amIStOfBattlegroup = createSelector(
  [getCurrentPlayer, getSpecificBattlegroup, getState],
  (player, battlegroup, state) => (
    battlegroup !== undefined &&
    battlegroup.chronicle_id &&
    state.entities.chronicles[battlegroup.chronicle_id] &&
    state.entities.chronicles[battlegroup.chronicle_id].st_id === player.id
  )
)
export const canISeeBattlegroup = createSelector(
  [getSpecificBattlegroup, doIOwnBattlegroup, amIStOfBattlegroup],
  (battlegroup, doI, amI) => !battlegroup.hidden || doI || amI
)

export const canIEditBattlegroup = createSelector(
  [doIOwnBattlegroup, amIStOfBattlegroup],
  (doI, amI) => doI || amI
)

export const canIDeleteBattlegroup = createSelector(
  [doIOwnBattlegroup],
  (doI) => doI
)
