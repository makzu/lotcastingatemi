import { createSelector } from 'reselect'

import { unwrapped } from 'ducks/entities/_lib'
import {
  getSpecificBattlegroup,
  doIOwnBattlegroup,
} from 'ducks/entities/battlegroup'
import { getCurrentPlayer } from 'ducks/entities/player'

const amIStOfBattlegroup = createSelector(
  [getCurrentPlayer, getSpecificBattlegroup, unwrapped],
  (player, character, state) =>
    character?.chronicle_id != null &&
    state.chronicles[character.chronicle_id] &&
    state.chronicles[character.chronicle_id].st_id === player.id,
)

export const canIEditBattlegroup = createSelector(
  [doIOwnBattlegroup, amIStOfBattlegroup],
  (doI, amI) => doI || amI,
)

export const canIDeleteBattlegroup = doIOwnBattlegroup
