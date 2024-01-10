import createCachedSelector from 're-reselect'
import { entities } from './entities'
import { sortOrderSort } from 'utils'

const characterIdMemoizer = (state, id) => id

const getSpecificCharacter = (state, id) => entities(state).characters[id]

const getCharms = (state) => entities(state).charms

// @ts-expect-error
export const getNativeCharmsForCharacter = createCachedSelector(
  [getSpecificCharacter, getCharms],
  (character, charms) =>
    character.charms === undefined
      ? []
      : character.charms.map((c) => charms[c]).sort(sortOrderSort),
)(characterIdMemoizer)
// @ts-expect-error
export const getMartialArtsCharmsForCharacter = createCachedSelector(
  [getSpecificCharacter, getCharms],
  (character, charms) =>
    character.martial_arts_charms === undefined
      ? []
      : character.martial_arts_charms.map((c) => charms[c]).sort(sortOrderSort),
)(characterIdMemoizer)
// @ts-expect-error
export const getEvocationsForCharacter = createCachedSelector(
  [getSpecificCharacter, getCharms],
  (character, charms) =>
    character.evocations === undefined
      ? []
      : character.evocations.map((c) => charms[c]).sort(sortOrderSort),
)(characterIdMemoizer)
// @ts-expect-error
export const getSpiritCharmsForCharacter = createCachedSelector(
  [getSpecificCharacter, getCharms],
  (character, charms) =>
    character.spirit_charms === undefined
      ? []
      : character.spirit_charms.map((c) => charms[c]).sort(sortOrderSort),
)(characterIdMemoizer)

const getSpells = (state) => entities(state).spells

// @ts-expect-error
const getSpellsForCharacter = createCachedSelector(
  [getSpecificCharacter, getSpells],
  (character, spells) =>
    character.spells.length === 0
      ? []
      : character.spells.map((s) => spells[s]).sort(sortOrderSort),
)(characterIdMemoizer)
// @ts-expect-error
export const getAllAbilitiesWithCharmsForCharacter = createCachedSelector(
  [getNativeCharmsForCharacter, getMartialArtsCharmsForCharacter],
  (charms, maCharms) => {
    let abilities = [...new Set(charms.map((c) => c.ability))]
    if (maCharms.length > 0) abilities = abilities.concat(['martial_arts'])
    return abilities.sort()
  },
)(characterIdMemoizer)
// @ts-expect-error
export const getAllMartialArtsCharmStylesForCharacter = createCachedSelector(
  [getMartialArtsCharmsForCharacter],
  (charms) => {
    const ch = charms.map((e) => e.style).sort()
    return [...new Set(ch)]
  },
)(characterIdMemoizer)
// @ts-expect-error
export const getAllEvocationArtifactsForCharacter = createCachedSelector(
  [getEvocationsForCharacter],
  (evocations) => {
    const evo = evocations.map((e) => e.artifact_name).sort()
    return [...new Set(evo)]
  },
)(characterIdMemoizer)
// @ts-expect-error
export const getAllCharmCategoriesForCharacter = createCachedSelector(
  [
    getNativeCharmsForCharacter,
    getMartialArtsCharmsForCharacter,
    getEvocationsForCharacter,
    getSpiritCharmsForCharacter,
    getSpellsForCharacter,
  ],
  (natives, maCharms, evocations, spiritCharms, spells) => {
    const ch = natives
      .concat(maCharms)
      .concat(evocations)
      .concat(spiritCharms)
      .concat(spells)
      .reduce((a, charm) => [...a, ...charm.categories], [])
      .concat(['Attack', 'Defense', 'Social'])
      .sort()
    return [...new Set(ch)]
  },
)(characterIdMemoizer)
