import createCachedSelector from 're-reselect'

import { State } from 'ducks'
import { unwrapped } from './_lib'
import { createApiActions, createTraitReducer } from './_trait'
import { getSpecificQc } from './qc'

export default createTraitReducer('spell')

export const [createSpell, updateSpell, destroySpell] =
  createApiActions('spell')

/* *** Selectors *** */
const getSpells = (state: State) => unwrapped(state).spells

export const getSpellsForQc = createCachedSelector(
  [getSpecificQc, getSpells],
  (qc, spells) => (qc == null ? [] : qc.spells.map((s) => spells[s])),
)((_state, id) => id)
