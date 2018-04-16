// @flow
import { createSelector } from 'reselect'
import createCachedSelector from 're-reselect'
import { getQcAttacks } from './qc.js'

const entities = (state) => state.entities.current

const getCurrentPlayer = (state) => entities(state).players[state.session.id]

export const getSpecificBattlegroup = (state: Object, id: number) => entities(state).battlegroups[id]

export const getAttacksForBattlegroup = createCachedSelector(
  [getSpecificBattlegroup, getQcAttacks],
  (bg, attacks) => bg.qc_attacks.map((m) => attacks[m])
)((state, id) => id)

export const doIOwnBattlegroup = createSelector(
  [getCurrentPlayer, getSpecificBattlegroup],
  (player, battlegroup) => battlegroup !== undefined && player.id === battlegroup.player_id
)

export const amIStOfBattlegroup = createSelector(
  [getCurrentPlayer, getSpecificBattlegroup, entities],
  (player, battlegroup, ents) => (
    battlegroup !== undefined &&
    battlegroup.chronicle_id &&
    ents.chronicles[battlegroup.chronicle_id] &&
    ents.chronicles[battlegroup.chronicle_id].st_id === player.id
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
