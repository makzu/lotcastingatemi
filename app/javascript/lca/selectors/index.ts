import { createSelector } from 'reselect'

export * from './battlegroup.ts'
export * from './character.ts'
export * from './charm.ts'
export * from './chronicle.ts'
export * from './entities.ts'
export * from './qc.ts'
export * from './weapon.ts'

import type { RootState } from '@lca/store.ts'
import type { CharacterType } from '@lca/types/index.ts'
import {
  canIDeleteBattlegroup,
  canIEditBattlegroup,
  getPoolsAndRatingsForBattlegroup,
} from './battlegroup.ts'
import {
  canIDeleteCharacter,
  canIEditCharacter,
  getPoolsAndRatings,
} from './character.ts'
import { amIStOfChronicle } from './chronicle.ts'
import { entities, getCurrentPlayer } from './entities.ts'
import { canIDeleteQc, canIEditQc, getPoolsAndRatingsForQc } from './qc.ts'

type CT = CharacterType | 'chronicle'
export const canIEdit = (state: RootState, id: number, characterType: CT) => {
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

export const canIDelete = (state: RootState, id: number, characterType: CT) => {
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

export const isPublicCharacterPage = (state: RootState, pathName: string) => {
  const path = pathName.split('/')

  if (
    ['characters', 'qcs', 'battlegroups'].includes(path[1]) &&
    entities(state)[path[1]][path[2]] !== undefined
  )
    return entities(state)[path[1]][path[2]].public as boolean

  return false
}

const getChronicles = (state: RootState) => entities(state).chronicles

export const getMyOwnChronicles = createSelector(
  [getCurrentPlayer, getChronicles],
  (currentPlayer, chronicles) =>
    currentPlayer.own_chronicles
      .map((c) => chronicles[c])
      .filter((c) => c?.name != null),
)

export const getMyChronicles = createSelector(
  [getCurrentPlayer, getChronicles],
  (currentPlayer, chronicles) =>
    currentPlayer.chronicles
      .map((c) => chronicles[c])
      .filter((c) => c?.name != null),
)

export const getPoolsAndRatingsGeneric = (
  state: RootState,
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
