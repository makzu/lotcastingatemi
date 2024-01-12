import { createApiActions, createTraitReducer } from './_trait'

/* *** Reducer *** */
export default createTraitReducer('merit')

export const [createMerit, updateMerit, destroyMerit] =
  createApiActions('merit')

/* Selectors */
import createCachedSelector from 're-reselect'

import { unwrapped } from './_lib'
import { getSpecificCharacter } from './character'
import { RootState } from 'store'

const getMerits = (state: RootState) => unwrapped(state).merits

export const getMeritsForCharacter = createCachedSelector(
  [getSpecificCharacter, getMerits],
  (character, merits) =>
    character == null ? [] : character.merits.map((m) => merits[m]),
)((_state, id) => id)
