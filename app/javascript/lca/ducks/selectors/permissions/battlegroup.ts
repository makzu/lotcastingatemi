import { createSelector } from 'reselect'

import { unwrapped } from 'ducks/entities/_lib'
import { getSpecificBattlegroup } from 'ducks/entities/battlegroup'
import { getCurrentPlayer } from 'ducks/entities/player'

const doIOwnBattlegroup = createSelector(
  [getCurrentPlayer, getSpecificBattlegroup],
  (player, character) => character != null && player.id === character.player_id
)

const amIStOfBattlegroup = createSelector(
  [getCurrentPlayer, getSpecificBattlegroup, unwrapped],
  (player, character, state) =>
    character != null &&
    character.chronicle_id != null &&
    state.chronicles[character.chronicle_id] &&
    state.chronicles[character.chronicle_id].st_id === player.id
)

export const canIEditBattlegroup = createSelector(
  [doIOwnBattlegroup, amIStOfBattlegroup],
  (doI, amI) => doI || amI
)

export const canIDeleteBattlegroup = doIOwnBattlegroup
