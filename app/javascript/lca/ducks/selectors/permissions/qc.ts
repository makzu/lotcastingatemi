import { createSelector } from 'reselect'

import { unwrapped } from '@lca/ducks/entities/_lib.ts'
import { getCurrentPlayer } from '@lca/ducks/entities/player.ts'
import { getSpecificQc } from '@lca/ducks/entities/qc.ts'

const doIOwnQc = createSelector(
  [getCurrentPlayer, getSpecificQc],
  (player, character) => character != null && player.id === character.player_id,
)

const amIStOfQc = createSelector(
  [getCurrentPlayer, getSpecificQc, unwrapped],
  (player, character, state) =>
    character != null &&
    character.chronicle_id != null &&
    state.chronicles[character.chronicle_id] &&
    state.chronicles[character.chronicle_id].st_id === player.id,
)

export const canIEditQc = createSelector(
  [doIOwnQc, amIStOfQc],
  (doI, amI) => doI || amI,
)

export const canIDeleteQc = doIOwnQc
