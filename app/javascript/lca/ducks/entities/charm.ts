import createCachedSelector from 're-reselect'

import { unwrapped } from './_lib'
import { createApiActions, createTraitReducer } from './_trait'
import { getSpecificCharacter } from './character'
import { RootState } from 'store'
import { sortOrderSort } from 'utils'

export default createTraitReducer('charm')

export const [createCharm, updateCharm, destroyCharm] =
  createApiActions('charm')

/* *** Selectors *** */
const idMemoizer = (_state: RootState, id: number) => id

const getCharms = (state: RootState) => unwrapped(state).charms

export const getNativeCharmsForCharacter = createCachedSelector(
  [getSpecificCharacter, getCharms],
  (character, charms) =>
    character == null
      ? []
      : character.charms.map((c) => charms[c]).sort(sortOrderSort),
)(idMemoizer)

export const getMartialArtsCharmsForCharacter = createCachedSelector(
  [getSpecificCharacter, getCharms],
  (character, charms) =>
    character == null
      ? []
      : character.martial_arts_charms.map((c) => charms[c]).sort(sortOrderSort),
)(idMemoizer)

export const getEvocationsForCharacter = createCachedSelector(
  [getSpecificCharacter, getCharms],
  (character, charms) =>
    character == null
      ? []
      : character.evocations.map((c) => charms[c]).sort(sortOrderSort),
)(idMemoizer)

export const getSpiritCharmsForCharacter = createCachedSelector(
  [getSpecificCharacter, getCharms],
  (character, charms) =>
    character == null
      ? []
      : character.spirit_charms.map((c) => charms[c]).sort(sortOrderSort),
)(idMemoizer)

export const getCharmsForCharacterByType = {
  evocation: getEvocationsForCharacter,
  martialArts: getMartialArtsCharmsForCharacter,
  native: getNativeCharmsForCharacter,
  spirit: getSpiritCharmsForCharacter,
}

export const getAllAbilitiesWithCharmsForCharacter = createCachedSelector(
  [getNativeCharmsForCharacter, getMartialArtsCharmsForCharacter],
  (charms, maCharms) => {
    let abilities = [...new Set(charms.map((c) => c.ability))]

    if (maCharms.length > 0) {
      abilities = abilities.concat(['martial_arts'])
    }

    return abilities.sort()
  },
)(idMemoizer)

export const getAllCharmsForCharacter = createCachedSelector(
  [
    getNativeCharmsForCharacter,
    getMartialArtsCharmsForCharacter,
    getEvocationsForCharacter,
    getSpiritCharmsForCharacter,
  ],
  (natives, martialArts, evocations, spirit) => [
    ...natives,
    ...martialArts,
    ...evocations,
    ...spirit,
  ],
)(idMemoizer)

export const getAllCharmCategoriesForCharacter = createCachedSelector(
  [getAllCharmsForCharacter],
  (charms) => {
    const ch = charms
      .reduce((a, charm) => [...a, ...charm.categories], [])
      .concat(['Attack', 'Defense', 'Social'])
      .sort()

    return [...new Set(ch)]
  },
)(idMemoizer)

export const getAllCharmKeywordsForCharacter = createCachedSelector(
  [getAllCharmsForCharacter],
  (charms) => {
    const ch = charms.reduce((a, charm) => [...a, ...charm.keywords], []).sort()

    return [...new Set(ch)]
  },
)(idMemoizer)
