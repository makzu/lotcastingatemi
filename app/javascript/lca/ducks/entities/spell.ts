import { createAction } from '@reduxjs/toolkit'
import { createCachedSelector } from 're-reselect'

import type { RootState } from '@lca/store.ts'
import { sortOrderSort } from '@lca/utils/index.ts'
import { unwrapped } from './_lib.ts'
import { createApiActions, createTraitReducer } from './_trait.ts'
import type { EntityState } from './_types.ts'
import { getSpecificCharacter } from './character.ts'
import { getSpecificQc } from './qc.ts'

export const updateSpellSort = createAction<{ id: number; sorting: number }>(
  'sort/spell',
)

export default createTraitReducer('spell', undefined, {
  [updateSpellSort.toString()]: (
    state: EntityState,
    action: ReturnType<typeof updateSpellSort>,
  ) => {
    const { id, sorting } = action.payload
    state.spells[id].sorting = sorting
  },
})

export const [createSpell, updateSpell, destroySpell] =
  createApiActions('spell')

/* *** Selectors *** */
const getSpells = (state: RootState) => unwrapped(state).spells

export const getSpellsForCharacter = createCachedSelector(
  [getSpecificCharacter, getSpells],
  (character, spells) =>
    character == null
      ? []
      : character.spells.map((s) => spells[s]).sort(sortOrderSort),
)((_state, id) => id)

export const getSpellsForQc = createCachedSelector(
  [getSpecificQc, getSpells],
  (qc, spells) => (qc == null ? [] : qc.spells.map((s) => spells[s])),
)((_state, id) => id)
