import createCachedSelector from 're-reselect'

import { unwrapped } from './_lib'
import { createApiActions, createTraitReducer } from './_trait'
import { getSpecificCharacter } from './character'
import { getSpecificQc } from './qc'
import { RootState } from 'store'

export default createTraitReducer('spell')

export const [createSpell, updateSpell, destroySpell] =
  createApiActions('spell')

/* *** Selectors *** */
const getSpells = (state: RootState) => unwrapped(state).spells

export const getSpellsForCharacter = createCachedSelector(
  [getSpecificCharacter, getSpells],
  (character, spells) =>
    character == null ? [] : character.spells.map((s) => spells[s]),
)((_state, id) => id)

export const getSpellsForQc = createCachedSelector(
  [getSpecificQc, getSpells],
  (qc, spells) => (qc == null ? [] : qc.spells.map((s) => spells[s])),
)((_state, id) => id)
