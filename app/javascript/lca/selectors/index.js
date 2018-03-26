import { createSelector } from 'reselect'

export * from './entities.js'
export * from './character.js'
export * from './weapon.js'

import { getSpecificCharacter } from './character.js'
import { getSpecificQc } from './qc.js'

const getState = (state) => state
export const getCurrentPlayer = (state) => state.entities.players[state.session.id]

export const canIEditCharacter = createSelector(
  [getCurrentPlayer, getSpecificCharacter, getState],
  (player, character, state) => {
    if (player.id === character.player_id)
      return true

    if (
      character.chronicle_id &&
      state.entities.chronicles[character.chronicle_id] &&
      state.entities.chronicles[character.chronicle_id].st_id === player.id
    )
      return true

    return false
  }
)

export const canIEditQc = createSelector(
  [getCurrentPlayer, getSpecificQc, getState],
  (player, character, state) => {
    if (player.id === character.player_id)
      return true

    if (
      character.chronicle_id &&
      state.entities.chronicles[character.chronicle_id] &&
      state.entities.chronicles[character.chronicle_id].st_id === player.id
    )
      return true

    return false
  }
)

const getChronicles = (state) => state.entities.chronicles
export const getMyOwnChronicles = createSelector(
  [getCurrentPlayer, getChronicles],
  (currentPlayer, chronicles) =>
    currentPlayer.own_chronicles.map((c) => chronicles[c])
)
export const getMyChronicles = createSelector(
  [getCurrentPlayer, getChronicles],
  (currentPlayer, chronicles) =>
    currentPlayer.chronicles.map((c) => chronicles[c])
)
