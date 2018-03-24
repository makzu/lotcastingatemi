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

const getSpells = (state) => state.entities.spells
export const getSpellsForCharacter = createCachedSelector(
  [getSpecificCharacter, getSpells],
  (character, spells) => character.spells.map((s) => spells[s])
)(characterIdMemoizer)
export const getControlSpellsForCharacter = createCachedSelector(
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
  [getSpecificCharacter, getMeritsForCharacter, getPenalties],
  (character, merits, penalties) => {
    const meritNames = merits.map((m) => m.merit_name.toLowerCase() + m.rating)

    return {
      guile: calc.guile(character, meritNames, penalties),
      resolve: calc.resolve(character, meritNames, penalties),
      readIntentions: calc.readIntentions(character, meritNames, penalties),

      evasion: calc.evasion(character, meritNames, penalties),
      soak: calc.soak(character, meritNames, penalties),
      hardness: { total: calc.hardness(character) },
      joinBattle: calc.joinBattle(character, meritNames, penalties),
      rush: calc.rush(character, meritNames, penalties),
      disengage: calc.disengage(character, meritNames, penalties),
      withdraw: calc.withdraw(character, meritNames, penalties),
      riseFromProne: calc.riseFromProne(character, meritNames, penalties),
      takeCover: calc.takeCover(character, meritNames, penalties),

      featOfStrength: calc.featOfStrength(character, meritNames, penalties),
      shapeSorcery: calc.shapeSorcery(character, meritNames, penalties),
    }
  }
)(characterIdMemoizer)
