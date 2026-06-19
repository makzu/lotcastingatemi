import { createAction } from '@reduxjs/toolkit'
import { createCachedSelector } from 're-reselect'

import type { RootState } from '@lca/store'
import type {
  Evocation,
  MartialArtsCharm,
  NativeCharm,
  SpiritCharm,
} from '@lca/types'
import { sortOrderSort } from '@lca/utils'
import { unwrapped } from './_lib'
import { createApiActions, createTraitReducer } from './_trait'
import type { EntityState } from './_types'
import { getSpecificCharacter } from './character'

export const updateCharmSort = createAction<{ id: number; sorting: number }>(
  'sort/charm',
)

export default createTraitReducer('charm', undefined, {
  [updateCharmSort.toString()]: (
    state: EntityState,
    action: ReturnType<typeof updateCharmSort>,
  ) => {
    const { id, sorting } = action.payload
    state.charms[id].sorting = sorting
  },
})

export const [createCharm, updateCharm, destroyCharm] =
  createApiActions('charm')

/* *** Selectors *** */
const idMemoizer = (_: RootState, id: number) => id

const getCharms = (state: RootState) => unwrapped(state).charms

export const getNativeCharmsForCharacter = createCachedSelector(
  [getSpecificCharacter, getCharms],
  (character, charms) =>
    character == null
      ? []
      : character.charms
          .map((c) => charms[c] as NativeCharm)
          .sort(sortOrderSort),
)(idMemoizer)

export const getMartialArtsCharmsForCharacter = createCachedSelector(
  [getSpecificCharacter, getCharms],
  (character, charms) =>
    character == null
      ? []
      : character.martial_arts_charms
          .map((c) => charms[c] as MartialArtsCharm)
          .sort(sortOrderSort),
)(idMemoizer)

export const getEvocationsForCharacter = createCachedSelector(
  [getSpecificCharacter, getCharms],
  (character, charms) =>
    character == null
      ? []
      : character.evocations
          .map((c) => charms[c] as Evocation)
          .sort(sortOrderSort),
)(idMemoizer)

export const getSpiritCharmsForCharacter = createCachedSelector(
  [getSpecificCharacter, getCharms],
  (character, charms) =>
    character == null
      ? []
      : character.spirit_charms
          .map((c) => charms[c] as SpiritCharm)
          .sort(sortOrderSort),
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
    let abilities = [
      ...new Set(charms.map((c) => c.ability).filter((c) => c !== undefined)),
    ]

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
      .flatMap((ch) => ch.categories)
      .concat(['Attack', 'Defense', 'Social'])
      .sort()

    return [...new Set(ch)]
  },
)(idMemoizer)

export const getAllCharmKeywordsForCharacter = createCachedSelector(
  [getAllCharmsForCharacter],
  (charms) => {
    const ch = charms.flatMap((ch) => ch.keywords).sort()

    return [...new Set(ch)]
  },
)(idMemoizer)

export const getAllCharmLoadoutsForCharacter = createCachedSelector(
  [getNativeCharmsForCharacter, getSpecificCharacter],
  (charms, character) => {
    const ch = charms
      .flatMap((ch) => ch?.loadouts ?? [])
      .concat([character.active_loadout ?? 'Default'])
      .concat(['*'])
      .sort()

    return [...new Set(ch)]
  },
)(idMemoizer)
