// @flow
import { createSelector } from 'reselect'

export * from './chronicle.js'
export * from './entities.js'
export * from './character.js'
export * from './weapon.js'
export * from './charm.js'
export * from './qc.js'
export * from './battlegroup.js'

import {
  getPoolsAndRatingsForBattlegroup,
  canIEditBattlegroup,
  canIDeleteBattlegroup,
} from './battlegroup.js'
import {
  getPoolsAndRatings,
  canIEditCharacter,
  canIDeleteCharacter,
} from './character.js'
import { amIStOfChronicle } from './chronicle.js'
import { entities, getCurrentPlayer } from './entities.js'
import { getPoolsAndRatingsForQc, canIEditQc, canIDeleteQc } from './qc.js'

type CT = 'chronicle' | 'character' | 'qc' | 'battlegroup'
export const canIEdit = (state: Object, id: number, characterType: CT) => {
  switch (characterType) {
    case 'chronicle':
      return amIStOfChronicle(state, id)
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

export const canIDelete = (state: Object, id: number, characterType: CT) => {
  switch (characterType) {
    case 'chronicle':
      return amIStOfChronicle(state, id)
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

export const isPublicCharacterPage = (state: Object, pathName: string) => {
  const path = pathName.split('/')

  if (
    ['characters', 'qcs', 'battlegroups'].includes(path[1]) &&
    entities(state)[path[1]][path[2]] !== undefined
  )
    return entities(state)[path[1]][path[2]].public

  return false
}

const getChronicles = (state) => entities(state).chronicles

// $FlowFixMe
export const getMyOwnChronicles = createSelector(
  [getCurrentPlayer, getChronicles],
  (currentPlayer, chronicles) =>
    currentPlayer.own_chronicles
      .map((c) => chronicles[c])
      .filter((c) => c !== undefined && c.name !== undefined),
)

// $FlowFixMe
export const getMyChronicles = createSelector(
  [getCurrentPlayer, getChronicles],
  (currentPlayer, chronicles) =>
    currentPlayer.chronicles
      .map((c) => chronicles[c])
      .filter((c) => c !== undefined && c.name !== undefined),
)

export const getPoolsAndRatingsGeneric = (
  state: Object,
  id: number,
  characterType: CT,
) => {
  switch (characterType) {
    case 'qc':
      return getPoolsAndRatingsForQc(state, id)
    case 'battlegroup':
      return getPoolsAndRatingsForBattlegroup(state, id)
    default:
      return getPoolsAndRatings(state, id)
  }
}

// export const getPoisons = state => entities(state).poisons
