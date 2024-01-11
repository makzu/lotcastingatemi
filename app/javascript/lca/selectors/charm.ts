import createCachedSelector from 're-reselect'
import { entities } from './entities'
import { isDefined, sortOrderSort } from 'utils'
import { WrappedEntityState } from 'ducks/entities/_types'
import { Character, Charm, Spell } from 'types'

const characterIdMemoizer = (state: WrappedEntityState, id: number) => id

const getSpecificCharacter = (state: WrappedEntityState, id: Character['id']) =>
  entities(state).characters[id]

const getCharms = (state: WrappedEntityState) => entities(state).charms

export const getNativeCharmsForCharacter = createCachedSelector(
  [getSpecificCharacter, getCharms],
  (character, charms) =>
    (character?.charms ?? [])
      .map((c) => charms[c])
      .filter(isDefined)
      .sort(sortOrderSort),
)(characterIdMemoizer)

export const getMartialArtsCharmsForCharacter = createCachedSelector(
  [getSpecificCharacter, getCharms],
  (character, charms) =>
    (character?.martial_arts_charms ?? [])
      .map((c) => charms[c])
      .filter(isDefined)
      .sort(sortOrderSort),
)(characterIdMemoizer)

export const getEvocationsForCharacter = createCachedSelector(
  [getSpecificCharacter, getCharms],
  (character, charms) =>
    (character?.evocations ?? [])
      .map((c) => charms[c])
      .filter(isDefined)
      .sort(sortOrderSort),
)(characterIdMemoizer)

export const getSpiritCharmsForCharacter = createCachedSelector(
  [getSpecificCharacter, getCharms],
  (character, charms) =>
    (character?.spirit_charms ?? [])
      .map((c) => charms[c])
      .filter(isDefined)
      .sort(sortOrderSort),
)(characterIdMemoizer)

const getSpells = (state: WrappedEntityState) => entities(state).spells

export const getSpellsForCharacter = createCachedSelector(
  [getSpecificCharacter, getSpells],
  (character, spells) =>
    (character?.spells ?? [])
      .map((s) => spells[s])
      .filter(isDefined)
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

export const getAllCharmCategoriesForCharacter = createCachedSelector(
  [
    getNativeCharmsForCharacter,
    getMartialArtsCharmsForCharacter,
    getEvocationsForCharacter,
    getSpiritCharmsForCharacter,
    getSpellsForCharacter,
  ],
  (natives, maCharms, evocations, spiritCharms, spells) => {
    const ch = (natives as (Charm | Spell)[])
      .concat(maCharms)
      .concat(evocations)
      .concat(spiritCharms)
      .concat(spells)
      .flatMap((charm) => charm.categories)
      .concat(['Attack', 'Defense', 'Social'])
      .sort()

    return [...new Set(ch)]
  },
)(characterIdMemoizer)