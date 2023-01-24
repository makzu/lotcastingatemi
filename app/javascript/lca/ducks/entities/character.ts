import { createSelector } from 'reselect'

import {
  createApiActions,
  createConditionalFetchAction,
  createEntityReducer,
  mergeEntity,
} from './_entity'
import { crudAction, standardTypes, unwrapped } from './_lib'
import { getCurrentPlayer } from './player'
import { useAppSelector } from 'hooks'
import { RootState } from 'store'
import { sortOrderSort } from 'utils'
import { callApi } from 'utils/api'

const CHARACTER = 'character'

/* *** Reducer *** */
export default createEntityReducer(CHARACTER, {
  [crudAction(CHARACTER, 'CHANGE_TYPE').success.toString()]: mergeEntity,
})

/* *** Actions *** */
export const [
  createCharacter,
  duplicateCharacter,
  fetchCharacter,
  fetchAllCharacters,
  updateCharacter,
  destroyCharacter,
] = createApiActions(CHARACTER)

export function changeCharacterType(id: number, type: string) {
  const action = crudAction(CHARACTER, 'CHANGE_TYPE')
  return callApi({
    body: JSON.stringify({ type }),
    endpoint: `/api/v1/characters/${id}/change_type`,
    types: standardTypes(CHARACTER, action),
  })
}

export const fetchCharacterIfNecessary = createConditionalFetchAction(
  CHARACTER,
  fetchCharacter,
)

/* *** Selectors *** */
const getCharacters = (state: RootState) => unwrapped(state).characters

export const getMyCharacters = createSelector(
  [getCurrentPlayer, getCharacters],
  (currentPlayer, characters) =>
    (currentPlayer.characters || [])
      .map((c) => characters[c])
      .sort(sortOrderSort),
)

export const getMyPinnedCharacters = createSelector(
  [getMyCharacters],
  (characters) => characters.filter((c) => c.pinned),
)

export const getMyCharactersWithoutChronicles = createSelector(
  [getMyCharacters],
  (characters) => characters.filter((c) => c.chronicle_id == null),
)

export const getSpecificCharacter = (state: RootState, id: number) =>
  unwrapped(state).characters[id]

export const useCharacterAttribute = (id: number, attribute: string) =>
  useAppSelector((state) => {
    const character = getSpecificCharacter(state, id)
    return character != null ? character[attribute] : null
  })
