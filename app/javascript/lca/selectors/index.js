import { createSelector } from 'reselect'

export * from './chronicle.js'
export * from './entities.js'
export * from './character.js'
export * from './weapon.js'
export * from './charm.js'
export * from './qc.js'
export * from './battlegroup.js'

import { canIEditCharacter, canIDeleteCharacter } from './character.js'
import { canIEditQc, canIDeleteQc } from './qc.js'
import { canIEditBattlegroup, canIDeleteBattlegroup } from './battlegroup.js'
import { canIEditChronicle } from './chronicle.js'

export const getCurrentPlayer = (state) => state.entities.players[state.session.id]

export const canIEdit = (state, id, characterType) => {
  switch (characterType) {
  case 'chronicle':
    return canIEditChronicle(state, id)
  case 'character':
    return canIEditCharacter(state, id)
  case 'qc':
    return canIEditQc(state, id)
  case 'battlegroup':
    return canIEditBattlegroup(state, id)
  default:
    return false
  }
}

export const canIDelete = (state, id, characterType) => {
  switch (characterType) {
  case 'chronicle':
    return canIEditChronicle(state, id)
  case 'character':
    return canIDeleteCharacter(state, id)
  case 'qc':
    return canIDeleteQc(state, id)
  case 'battlegroup':
    return canIDeleteBattlegroup(state, id)
  default:
    return false
  }
}

export const isPublicCharacterPage = (state, pathName) => {
  const path = pathName.split('/')

  if (['characters', 'qcs', 'battlegroups'].includes(path[1]) &&
    state.entities[path[1]][path[2]] !== undefined
  )
    return state.entities[path[1]][path[2]].public

  return false
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
