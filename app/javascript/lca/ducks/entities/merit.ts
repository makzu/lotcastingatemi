import { createApiActions, createTraitReducer } from './_trait'

/* *** Reducer *** */
export default createTraitReducer('merit')

export const [createMerit, updateMerit, destroyMerit] = createApiActions(
  'merit'
)

/* Selectors */
import createCachedSelector from 're-reselect'

import { State } from 'ducks'
import { unwrapped } from './_lib'
import { getSpecificCharacter } from './character'

const getMerits = (state: State) => unwrapped(state).merits

export const getMeritsForCharacter = createCachedSelector(
  [getSpecificCharacter, getMerits],
  (character, merits) =>
    character == null ? [] : character.merits.map(m => merits[m])
)((_state, id) => id)
