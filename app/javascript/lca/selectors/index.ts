import { createSelector } from 'reselect'
export * from './chronicle'
export * from './entities'
export * from './character'
export * from './weapon'
export * from './charm'
export * from './qc'
export * from './battlegroup'
import {
  getPoolsAndRatingsForBattlegroup,
  canIEditBattlegroup,
  canIDeleteBattlegroup,
} from './battlegroup'
import {
  getPoolsAndRatings,
  canIEditCharacter,
  canIDeleteCharacter,
} from './character'
import { amIStOfChronicle } from './chronicle'
import { entities, getCurrentPlayer } from './entities'
import { getPoolsAndRatingsForQc, canIEditQc, canIDeleteQc } from './qc'
import { WrappedEntityState } from 'ducks/entities'
type CT = 'chronicle' | 'character' | 'qc' | 'battlegroup'

export const canIEdit = (
  state: WrappedEntityState,
  id: number,
  characterType: CT,
) => {
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

export const canIDelete = (
  state: WrappedEntityState,
  id: number,
  characterType: CT,
) => {
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
export const isPublicCharacterPage = (
  state: WrappedEntityState,
  pathName: string,
) => {
  const path = pathName.split('/')
  if (
    ['characters', 'qcs', 'battlegroups'].includes(path[1]) &&
    entities(state)[path[1]][path[2]] !== undefined
  )
    return entities(state)[path[1]][path[2]].public
  return false
}

const getChronicles = (state: WrappedEntityState) => entities(state).chronicles

export const getMyOwnChronicles = createSelector(
  [getCurrentPlayer, getChronicles],
  (currentPlayer, chronicles) =>
    currentPlayer.own_chronicles
      .map((c) => chronicles[c])
      .filter((c) => c?.name !== undefined),
)

export const getMyChronicles = createSelector(
  [getCurrentPlayer, getChronicles],
  (currentPlayer, chronicles) =>
    currentPlayer.chronicles
      .map((c) => chronicles[c])
      .filter((c) => c?.name !== undefined),
)

export const getPoolsAndRatingsGeneric = (
  state: WrappedEntityState,
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
