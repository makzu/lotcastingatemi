import { createAction } from '@reduxjs/toolkit'
import createCachedSelector from 're-reselect'

import { isDefined } from '@/utils'
import type { RootState } from 'store'
import { unwrapped } from './_lib'
import { createApiActions, createTraitReducer } from './_trait'
import { EntityState } from './_types'
import { getSpecificCharacter } from './character'
import { getSpecificQc } from './qc'

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
    (character?.spells ?? []).map((s) => spells[s]).filter(isDefined),
)((_state, id) => id)

export const getSpellsForQc = createCachedSelector(
  [getSpecificQc, getSpells],
  (qc, spells) => (qc?.spells ?? []).map((s) => spells[s]).filter(isDefined),
)((_state, id) => id)
