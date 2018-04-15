import { createSelector } from 'reselect'
import createCachedSelector from 're-reselect'

import { getPoolsForWeapon, sortByParry, } from './weapon.js'
import { getNativeCharmsForCharacter, getMartialArtsCharmsForCharacter } from './charm.js'
import { sortOrderSort } from 'utils'
import * as calc from 'utils/calculated/'

const getState = (state) => state
const getCurrentPlayer = (state) => state.entities.players[state.session.id]

//const characterCount = (state) => state.entities.characters.length
export const getSpecificCharacter = (state, id) => state.entities.characters[id]
const characterIdMemoizer = (state, id) => id
export const getCachedSpecificCharacter = createCachedSelector(
  [getSpecificCharacter],
  (character) => character
)(characterIdMemoizer)

const getMerits = (state) => state.entities.merits
export const getMeritsForCharacter = createCachedSelector(
  [getSpecificCharacter, getMerits],
  (character, merits) => character.merits.map((m) => merits[m]).sort(sortOrderSort)
)(characterIdMemoizer)
export const getMeritNamesForCharacter = (state, id) => getMeritsForCharacter(state, id).map((m) => m.merit_name.toLowerCase() + m.rating).sort()
export const getEvokableMeritsForCharacter = createSelector(
  [getMeritsForCharacter],
  (merits) => merits.filter((m) =>
    m.merit_name.toLowerCase() == 'artifact' || m.merit_name.toLowerCase() == 'hearthstone'
  )
)

const getWeapons = (state) => state.entities.weapons
export const getWeaponsForCharacter = createCachedSelector(
  [getSpecificCharacter, getWeapons],
  (character, weapons) => character.weapons.map((w) => weapons[w]).sort(sortOrderSort)
)(characterIdMemoizer)

const getSpells = (state) => state.entities.spells
export const getSpellsForCharacter = createCachedSelector(
  [getSpecificCharacter, getSpells],
  (character, spells) => character.spells.map((s) => spells[s]).sort(sortOrderSort)
)(characterIdMemoizer)
export const getControlSpellsForCharacter = (state, id) => getSpellsForCharacter(state, id).filter((s) => s.control)

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

export const getPoolsForAllWeaponsForCharacter = createSelector(
  [getSpecificCharacter, getState],
  (character, state) => character.weapons.map((id) => getPoolsForWeapon(state, id))
)

export const getPoolsAndRatings = createCachedSelector(
  [
    getSpecificCharacter,
    getMeritNamesForCharacter,
    getNativeCharmsForCharacter,
    getMartialArtsCharmsForCharacter,
    getControlSpellsForCharacter,
    getPenalties,
    getPoolsForAllWeaponsForCharacter
  ],
  (character, meritNames, nativeCharms, maCharms, spells, penalties, weaponPools) => {
    const spellNames = spells.map((m) => m.name.toLowerCase())
    const excellencyAbils = calc.excellencyAbils(character, nativeCharms.concat(maCharms))

    const bestParryWeapon = weaponPools.sort(sortByParry)[0] || { parry: { total: 'None', noSummary: true }}

    return {
      exaltTypeBase: calc.exaltTypeBase(character),
      excellencyAbils: excellencyAbils,
      guile: calc.guile(character, meritNames, penalties, excellencyAbils),
      resolve: calc.resolve(character, meritNames, penalties, excellencyAbils),
      appearance: calc.appearanceRating(character, meritNames, penalties, excellencyAbils),
      readIntentions: calc.readIntentions(character, meritNames, penalties, excellencyAbils),

      evasion: calc.evasion(character, meritNames, penalties, excellencyAbils),
      bestParry: bestParryWeapon.parry,
      soak: calc.soak(character, meritNames, spellNames),
      hardness: { total: calc.hardness(character) },
      joinBattle: calc.joinBattle(character, meritNames, penalties, excellencyAbils),
      rush: calc.rush(character, meritNames, penalties, excellencyAbils),
      disengage: calc.disengage(character, meritNames, penalties, excellencyAbils),
      withdraw: calc.withdraw(character, meritNames, penalties, excellencyAbils),
      riseFromProne: calc.riseFromProne(character, meritNames, penalties, excellencyAbils),
      takeCover: calc.takeCover(character, meritNames, penalties, excellencyAbils),

      featOfStrength: calc.featOfStrength(character, meritNames, penalties, excellencyAbils),
      shapeSorcery: calc.shapeSorcery(character, meritNames, penalties, excellencyAbils),
    }
  }
)(characterIdMemoizer)

export const doIOwnCharacter = createSelector(
  [getCurrentPlayer, getSpecificCharacter],
  (player, character) => character !== undefined && player.id === character.player_id
)

export const amIStOfCharacter = createSelector(
  [getCurrentPlayer, getSpecificCharacter, getState],
  (player, character, state) => (
    character !== undefined &&
    character.chronicle_id &&
    state.entities.chronicles[character.chronicle_id] &&
    state.entities.chronicles[character.chronicle_id].st_id === player.id
  )
)
export const canISeeCharacter = createSelector(
  [getSpecificCharacter, doIOwnCharacter, amIStOfCharacter],
  (character, doI, amI) => !character.hidden || doI || amI
)

export const canIEditCharacter = createSelector(
  [doIOwnCharacter, amIStOfCharacter],
  (doI, amI) => doI || amI
)

export const canIDeleteCharacter = createSelector(
  [doIOwnCharacter],
  (doI) => doI
)
