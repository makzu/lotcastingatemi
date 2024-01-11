import createCachedSelector from 're-reselect'

import { State } from 'ducks'
import { unwrapped } from './_lib'
import { createApiActions, createTraitReducer } from './_trait'
import { getSpecificQc } from './qc'
import { isDefined } from 'utils'

export default createTraitReducer('spell')

export const [createSpell, updateSpell, destroySpell] =
  createApiActions('spell')

/* *** Selectors *** */
const getSpells = (state: State) => unwrapped(state).spells

export const getSpellsForQc = createCachedSelector(
  [getSpecificQc, getSpells],
  (qc, spells) => (qc?.spells ?? []).map((s) => spells[s]).filter(isDefined),
)((_state, id) => id)
