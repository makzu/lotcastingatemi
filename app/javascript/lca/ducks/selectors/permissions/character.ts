import { createSelector } from 'reselect'

import { unwrapped } from '@/ducks/entities/_lib'
import { getSpecificCharacter } from '@/ducks/entities/character'
import { getCurrentPlayer } from '@/ducks/entities/player'

const doIOwnCharacter = createSelector(
  [getCurrentPlayer, getSpecificCharacter],
  (player, character) => character != null && player.id === character.player_id,
)

const amIStOfCharacter = createSelector(
  [getCurrentPlayer, getSpecificCharacter, unwrapped],
  (player, character, state) =>
    character?.chronicle_id != null &&
    state.chronicles[character.chronicle_id] &&
    state.chronicles[character.chronicle_id].st_id === player.id,
)

export const canIEditCharacter = createSelector(
  [doIOwnCharacter, amIStOfCharacter],
  (doI, amI) => doI || amI,
)

export const canIDeleteCharacter = doIOwnCharacter
