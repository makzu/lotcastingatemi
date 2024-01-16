import { createAction } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'
import { createSelector } from 'reselect'

import { State } from 'ducks'
import { sortOrderSort } from 'utils'
import { callApi } from 'utils/api'
import {
  createApiActions,
  createConditionalFetchAction,
  createEntityReducer,
  mergeEntity,
} from './_entity'
import { crudAction, standardTypes, unwrapped } from './_lib'
import { EntityState } from './_types'
import { getCurrentPlayer } from './player'

const CHARACTER = 'character'

export const updateCharacterSort = createAction<{
  id: number
  sorting: number
}>('sort/character')

export const updateCharacterChronicleSort = createAction<{
  id: number
  sorting: number
}>('chronicle_sort/character')

/* *** Reducer *** */
export default createEntityReducer(CHARACTER, {
  [crudAction(CHARACTER, 'CHANGE_TYPE').success.toString()]: mergeEntity,
  [updateCharacterSort.toString()]: (
    state: EntityState,
    action: ReturnType<typeof updateCharacterSort>,
  ) => {
    const { id, sorting } = action.payload
    state.characters[id].sorting = sorting
  },
  [updateCharacterChronicleSort.toString()]: (
    state: EntityState,
    action: ReturnType<typeof updateCharacterChronicleSort>,
  ) => {
    const { id, sorting } = action.payload
    state.characters[id].chronicle_sorting = sorting
  },
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
const getCharacters = (state: State) => unwrapped(state).characters

export const getMyCharacters = createSelector(
  [getCurrentPlayer, getCharacters],
  (currentPlayer, characters) =>
    currentPlayer.characters.map((c) => characters[c]).sort(sortOrderSort),
)

export const getMyPinnedCharacters = createSelector(
  [getMyCharacters],
  (characters) => characters.filter((c) => c.pinned),
)

export const getMyCharactersWithoutChronicles = createSelector(
  [getMyCharacters],
  (characters) => characters.filter((c) => c.chronicle_id == null),
)

export const getSpecificCharacter = (state: State, id: number) =>
  unwrapped(state).characters[id]

export const useCharacterAttribute = (id: number, attribute: string) =>
  useSelector((state: State) => {
    const character = getSpecificCharacter(state, id)
    return character != null ? character[attribute] : null
  })
