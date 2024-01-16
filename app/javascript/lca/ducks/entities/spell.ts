import { createAction } from '@reduxjs/toolkit'
import createCachedSelector from 're-reselect'

import { State } from 'ducks'
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
const getSpells = (state: State) => unwrapped(state).spells

export const getSpellsForCharacter = createCachedSelector(
  [getSpecificCharacter, getSpells],
  (character, spells) =>
    character == null ? [] : character.spells.map((s) => spells[s]),
)((_state, id) => id)

export const getSpellsForQc = createCachedSelector(
  [getSpecificQc, getSpells],
  (qc, spells) => (qc == null ? [] : qc.spells.map((s) => spells[s])),
)((_state, id) => id)
