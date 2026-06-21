import { createCachedSelector } from 're-reselect'

import type { RootState } from '@lca/store.ts'
import type {
  Evocation,
  MartialArtsCharm,
  NativeCharm,
  SpiritCharm,
} from '@lca/types/traits/index.ts'
import { sortOrderSort } from '@lca/utils/index.ts'
import { entities } from './entities.ts'

const characterIdMemoizer = (_state: RootState, id: number) => id

const getSpecificCharacter = (state: RootState, id: number) =>
  entities(state).characters[id]

const getCharms = (state: RootState) => entities(state).charms

export const getNativeCharmsForCharacter = createCachedSelector(
  [getSpecificCharacter, getCharms],
  (character, charms) =>
    character.charms === undefined
      ? []
      : character.charms
          .map((c) => charms[c] as NativeCharm)
          .sort(sortOrderSort),
)(characterIdMemoizer)

export const getMartialArtsCharmsForCharacter = createCachedSelector(
  [getSpecificCharacter, getCharms],
  (character, charms) =>
    character.martial_arts_charms === undefined
      ? []
      : character.martial_arts_charms
          .map((c) => charms[c] as MartialArtsCharm)
          .sort(sortOrderSort),
)(characterIdMemoizer)

export const getEvocationsForCharacter = createCachedSelector(
  [getSpecificCharacter, getCharms],
  (character, charms) =>
    character.evocations === undefined
      ? []
      : character.evocations
          .map((c) => charms[c] as Evocation)
          .sort(sortOrderSort),
)(characterIdMemoizer)

export const getSpiritCharmsForCharacter = createCachedSelector(
  [getSpecificCharacter, getCharms],
  (character, charms) =>
    character.spirit_charms === undefined
      ? []
      : character.spirit_charms
          .map((c) => charms[c] as SpiritCharm)
          .sort(sortOrderSort),
)(characterIdMemoizer)

export const getAllAbilitiesWithCharmsForCharacter = createCachedSelector(
  [getNativeCharmsForCharacter, getMartialArtsCharmsForCharacter],
  (charms, maCharms) => {
    let abilities = [...new Set(charms.map((c) => c.ability))]

    if (maCharms.length > 0) abilities = abilities.concat(['martial_arts'])

    return abilities.sort()
  },
)(characterIdMemoizer)

export const getAllMartialArtsCharmStylesForCharacter = createCachedSelector(
  [getMartialArtsCharmsForCharacter],
  (charms) => {
    const ch = charms.map((e) => e.style).sort()

    return [...new Set(ch)]
  },
)(characterIdMemoizer)

export const getAllEvocationArtifactsForCharacter = createCachedSelector(
  [getEvocationsForCharacter],
  (evocations) => {
    const evo = evocations.map((e) => e.artifact_name).sort()

    return [...new Set(evo)]
  },
)(characterIdMemoizer)
