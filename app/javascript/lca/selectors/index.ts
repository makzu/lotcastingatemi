import { createSelector } from 'reselect'

export * from './battlegroup'
export * from './character'
export * from './charm'
export * from './chronicle'
export * from './entities'
export * from './qc'
export * from './weapon'
export { doIOwnBattlegroup } from '@/ducks/entities/battlegroup'
import type { RootState } from '@/store'
import {
  canIDeleteBattlegroup,
  canIEditBattlegroup,
} from '@/ducks/entities/battlegroup'
import { getPoolsAndRatingsForBattlegroup } from './battlegroup'

import {
  canIDeleteCharacter,
  canIEditCharacter,
  getPoolsAndRatings,
} from './character'
import { amIStOfChronicle } from './chronicle'
import { entities, getCurrentPlayer } from './entities'
import { canIDeleteQc, canIEditQc, getPoolsAndRatingsForQc } from './qc'
import { isDefined } from '@/utils'

type CT = 'chronicle' | 'character' | 'qc' | 'battlegroup'
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
    return entities(state)[path[1]][path[2]].public
  return false
}

const getChronicles = (state: RootState) => entities(state).chronicles

export const getMyOwnChronicles = createSelector(
  [getCurrentPlayer, getChronicles],
  (currentPlayer, chronicles) =>
    (currentPlayer?.own_chronicles ?? [])
      .map((c) => chronicles[c])
      .filter(isDefined),
)

export const getMyChronicles = createSelector(
  [getCurrentPlayer, getChronicles],
  (currentPlayer, chronicles) =>
    (currentPlayer?.chronicles ?? [])
      .map((c) => chronicles[c])
      .filter(isDefined),
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
