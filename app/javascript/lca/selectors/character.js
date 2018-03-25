import { createSelector } from 'reselect'
import createCachedSelector from 're-reselect'
import * as calc from '../utils/calculated/'

export const getSpecificCharacter = (state, id) => state.entities.characters[id]

const characterIdMemoizer = (state, id) => state.entities.characters[id].id

const getMerits = (state) => state.entities.merits
export const getMeritsForCharacter = createCachedSelector(
  [getSpecificCharacter, getMerits],
  (character, merits) => character.merits.map((m) => merits[m])
)(characterIdMemoizer)

const getWeapons = (state) => state.entities.weapons
export const getWeaponsForCharacter = createCachedSelector(
  [getSpecificCharacter, getWeapons],
  (character, weapons) => character.weapons.map((w) => weapons[w])
)(characterIdMemoizer)

const getCharms = (state) => state.entities.charms
export const getAllCharmsForCharacter = createSelector(
  [getSpecificCharacter, getCharms],
  (character, charms) => {
    let ch = []
    let maCh = []

    if (character.charms !== undefined && character.charms.length > 0)
      ch = character.charms.map((c) => charms[c])

    if (character.martial_arts_charms !== undefined && character.martial_arts_charms.length > 0)
      maCh = character.martial_arts_charms.map((c) => charms[c])

    return ch.concat(maCh)
  }
)

const getSpells = (state) => state.entities.spells
export const getSpellsForCharacter = createCachedSelector(
  [getSpecificCharacter, getSpells],
  (character, spells) => character.spells.map((s) => spells[s])
)(characterIdMemoizer)
export const getControlSpellsForCharacter = createSelector(
  [getSpellsForCharacter],
  (spells) => spells.filter((s) => s.control_spells)
)


export const getPenalties = createCachedSelector(
  [getSpecificCharacter, getMeritsForCharacter],
  (character, merits) => {
    const meritNames = merits.map((m) => m.merit_name.toLowerCase() + m.rating)
    return {
      mobility: calc.mobilityPenalty(character, meritNames),
      onslaught: character.onslaught,
      wound: calc.woundPenalty(character, meritNames),
    }
  }
)(characterIdMemoizer)

export const getPoolsAndRatings = createCachedSelector(
  [getSpecificCharacter, getMeritsForCharacter, getAllCharmsForCharacter, getControlSpellsForCharacter, getPenalties],
  (character, merits, charms, spells, penalties) => {
    const meritNames = [ ...new Set(merits.map((m) => m.merit_name.toLowerCase() + m.rating)) ]
    const charmAbils = [ ...new Set(charms.map((c) => c.type === 'MartialArtsCharm' ? 'martial_arts' : c.ability)) ]
    const spellNames = [ ...new Set(spells.map((m) => m.name.toLowerCase())) ]

    return {
      guile: calc.guile(character, meritNames, penalties, charmAbils),
      resolve: calc.resolve(character, meritNames, penalties, charmAbils),
      appearance: calc.appearanceRating(character, meritNames, penalties, charmAbils),
      readIntentions: calc.readIntentions(character, meritNames, penalties, charmAbils),

      evasion: calc.evasion(character, meritNames, penalties, charmAbils),
      soak: calc.soak(character, meritNames, spellNames),
      hardness: { total: calc.hardness(character) },
      joinBattle: calc.joinBattle(character, meritNames, penalties, charmAbils),
      rush: calc.rush(character, meritNames, penalties, charmAbils),
      disengage: calc.disengage(character, meritNames, penalties, charmAbils),
      withdraw: calc.withdraw(character, meritNames, penalties, charmAbils),
      riseFromProne: calc.riseFromProne(character, meritNames, penalties, charmAbils),
      takeCover: calc.takeCover(character, meritNames, penalties, charmAbils),

      featOfStrength: calc.featOfStrength(character, meritNames, penalties, charmAbils),
      shapeSorcery: calc.shapeSorcery(character, meritNames, penalties, charmAbils),
    }
  }
)(characterIdMemoizer)
