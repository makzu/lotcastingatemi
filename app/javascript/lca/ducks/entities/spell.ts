import createCachedSelector from 're-reselect'

import { unwrapped } from './_lib'
import { createApiActions, createTraitReducer } from './_trait'
import { getSpecificQc } from './qc'
import { isDefined } from '@/utils'
import type { RootState } from 'store'
import { getSpecificCharacter } from './character'

export default createTraitReducer('spell')

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
