import { createSelector } from 'reselect'

export * from './entities.js'
export * from './character.js'
export * from './weapon.js'

export const getCurrentPlayer = (state) => state.entities.players[state.session.id]

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
