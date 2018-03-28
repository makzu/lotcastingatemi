import { createSelector } from 'reselect'

export * from './entities.js'
export * from './character.js'
export * from './weapon.js'
export * from './qc.js'
export * from './battlegroup.js'

import { canIEditCharacter, canIDeleteCharacter } from './character.js'
import { canIEditQc, canIDeleteQc } from './qc.js'
import { canIEditBattlegroup, canIDeleteBattlegroup } from './battlegroup.js'

export const getCurrentPlayer = (state) => state.entities.players[state.session.id]

export const canIEdit = (state, id, characterType) => {
  switch (characterType) {
  case 'characters':
    return canIEditCharacter(state, id)
  case 'qcs':
    return canIEditQc(state, id)
  case 'battlegroups':
    return canIEditBattlegroup(state, id)
  default:
    return false
  }
}

export const canIDelete = (state, id, characterType) => {
  switch (characterType) {
  case 'characters':
    return canIDeleteCharacter(state, id)
  case 'qcs':
    return canIDeleteQc(state, id)
  case 'battlegroups':
    return canIDeleteBattlegroup(state, id)
  default:
    return false
  }
}

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
