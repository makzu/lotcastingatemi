import { createAction } from '@reduxjs/toolkit'

import { createApiActions, createTraitReducer } from './_trait'
import { type EntityState } from './_types'

export const updateMeritSort = createAction<{ id: number; sorting: number }>(
  'sort/merit',
)

/* *** Reducer *** */
export default createTraitReducer('merit', undefined, {
  [updateMeritSort.toString()]: (
    state: EntityState,
    action: ReturnType<typeof updateMeritSort>,
  ) => {
    const { id, sorting } = action.payload
    state.merits[id].sorting = sorting
  },
})

export const [createMerit, updateMerit, destroyMerit] =
  createApiActions('merit')

/* Selectors */
import createCachedSelector from 're-reselect'

import { unwrapped } from './_lib'
import { getSpecificCharacter } from './character'
import type { RootState } from 'store'

const getMerits = (state: RootState) => unwrapped(state).merits

export const getMeritsForCharacter = createCachedSelector(
  [getSpecificCharacter, getMerits],
  (character, merits) =>
    character == null ? [] : character.merits.map((m) => merits[m]),
)((_state, id) => id)
