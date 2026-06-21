import { createAction } from '@reduxjs/toolkit'
import { createSelector } from 'reselect'

import { useAppSelector } from '@lca/hooks/UseAppSelector.ts'
import type { RootState } from '@lca/store.ts'
import { callApi } from '@lca/utils/api.ts'
import { sortOrderSort } from '@lca/utils/index.ts'
import {
  createApiActions,
  createConditionalFetchAction,
  createEntityReducer,
  mergeEntity,
} from './_entity.ts'
import { crudAction, standardTypes, unwrapped } from './_lib.ts'
import type { EntityState } from './_types.ts'
import { getCurrentPlayer } from './player.ts'

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
    method: 'POST',
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

export const getSpecificCharacter = (state: RootState, id: number) =>
  unwrapped(state).characters[id]

export const useCharacterAttribute = (id: number, attribute: string) =>
  useAppSelector((state) => {
    const character = getSpecificCharacter(state, id)
    return character != null ? character[attribute] : null
  })
