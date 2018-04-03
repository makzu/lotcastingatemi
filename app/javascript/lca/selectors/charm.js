import createCachedSelector from 're-reselect'
import { sortOrderSort } from '../utils'

const characterIdMemoizer = (state, id) => id
const getSpecificCharacter = (state, id) => state.entities.characters[id]

const getCharms = (state) => state.entities.charms
export const getNativeCharmsForCharacter = createCachedSelector(
  [getSpecificCharacter, getCharms],
  (character, charms) => character.charms !== undefined ? sortOrderSort(character.charms.map((c) => charms[c])) : []
)(characterIdMemoizer)

export const getMartialArtsCharmsForCharacter = createCachedSelector(
  [getSpecificCharacter, getCharms],
  (character, charms) => character.martial_arts_charms !== undefined ? sortOrderSort(character.martial_arts_charms.map((c) => charms[c])) : []
)(characterIdMemoizer)

export const getEvocationsForCharacter = createCachedSelector(
  [getSpecificCharacter, getCharms],
  (character, charms) => character.evocations !== undefined ? sortOrderSort(character.evocations.map((c) => charms[c])) : []
)(characterIdMemoizer)

export const getSpiritCharmsForCharacter = createCachedSelector(
  [getSpecificCharacter, getCharms],
  (character, charms) => character.spirit_charms !== undefined ? sortOrderSort(character.spirit_charms.map((c) => charms[c])) : []
)(characterIdMemoizer)

const getSpells = (state) => state.entities.spells
const getSpellsForCharacter = createCachedSelector(
  [getSpecificCharacter, getSpells],
  (character, spells) => sortOrderSort(character.spells.map((s) => spells[s])) || []
)(characterIdMemoizer)

export const getAllAbilitiesWithCharmsForCharacter = createCachedSelector(
  [getNativeCharmsForCharacter, getMartialArtsCharmsForCharacter],
  (charms, maCharms) => {
    let abilities = [ ...new Set(charms.map((c) => c.ability))]

    if (maCharms.length > 0)
      abilities = abilities.concat(['martial_arts'])

    return abilities.sort()
  }
)(characterIdMemoizer)

export const getAllMartialArtsCharmStylesForCharacter = createCachedSelector(
  [getMartialArtsCharmsForCharacter],
  (charms) => {
    let ch = charms.map((e) => e.style ).sort()

    return [ ...new Set(ch) ]
  }
)(characterIdMemoizer)

export const getAllEvocationArtifactsForCharacter = createCachedSelector(
  [getEvocationsForCharacter],
  (evocations) => {
    let evo = evocations.map((e) => e.artifact_name ).sort()

    return [ ...new Set(evo) ]
  }
)(characterIdMemoizer)

export const getAllCharmCategoriesForCharacter = createCachedSelector(
  [
    getNativeCharmsForCharacter, getMartialArtsCharmsForCharacter,
    getEvocationsForCharacter, getSpiritCharmsForCharacter,
    getSpellsForCharacter,
  ],
  (natives, maCharms, evocations, spiritCharms, spells) => {
    let ch = natives.concat(maCharms)
      .concat(evocations)
      .concat(spiritCharms)
      .concat(spells)
      .reduce((a, charm) => [ ...a, ...charm.categories], [])
      .concat(['Attack', 'Defense', 'Social'])
      .sort()

    return [ ...new Set(ch)]
  }
)(characterIdMemoizer)
