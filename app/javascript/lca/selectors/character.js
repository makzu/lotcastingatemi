// @flow
import { createSelector } from 'reselect'
import createCachedSelector from 're-reselect'

import { getPoolsForWeapon, sortByParry, } from './weapon.js'
import { getNativeCharmsForCharacter, getMartialArtsCharmsForCharacter } from './charm.js'
import { sortOrderSort } from 'utils'
import {
  woundPenalty, mobilityPenalty, exaltTypeBase
} from 'utils/calculated/'
import { excellencyAbils as excellencies } from 'utils/calculated/_excellencies.js'
import * as pools from 'utils/calculated/_pools.js'
import * as ratings from 'utils/calculated/_ratings.js'

const entities = (state) => state.entities.current

const getState = (state) => state
const getCurrentPlayer = (state) => entities(state).players[state.session.id]

export const getSpecificCharacter = (state: Object, id: number) => entities(state).characters[id]
const characterIdMemoizer = (state, id) => id
export const getCachedSpecificCharacter = createCachedSelector(
  [getSpecificCharacter],
  (character) => character
)(characterIdMemoizer)

const getMerits = (state) => entities(state).merits
export const getMeritsForCharacter = createCachedSelector(
  [getSpecificCharacter, getMerits],
  (character, merits) => character.merits.map((m) => merits[m]).sort(sortOrderSort)
)(characterIdMemoizer)
export const getMeritNamesForCharacter = (state: Object, id: number) => getMeritsForCharacter(state, id).map((m) => m.merit_name.toLowerCase() + m.rating).sort()
export const getEvokableMeritsForCharacter = createSelector(
  [getMeritsForCharacter],
  (merits) => merits.filter((m) =>
    m.merit_name.toLowerCase() == 'artifact' || m.merit_name.toLowerCase() == 'hearthstone'
  )
)

const getWeapons = (state) => entities(state).weapons
export const getWeaponsForCharacter = createCachedSelector(
  [getSpecificCharacter, getWeapons],
  (character, weapons) => character.weapons.map((w) => weapons[w]).sort(sortOrderSort)
)(characterIdMemoizer)

const getSpells = (state) => entities(state).spells
export const getSpellsForCharacter = createCachedSelector(
  [getSpecificCharacter, getSpells],
  (character, spells) => character.spells.map((s) => spells[s]).sort(sortOrderSort)
)(characterIdMemoizer)
export const getControlSpellsForCharacter = (state: Object, id: number) => getSpellsForCharacter(state, id).filter((s) => s.control)

export const getPenalties = createCachedSelector(
  [getSpecificCharacter, getMeritsForCharacter],
  (character, merits) => {
    const meritNames = merits.map((m) => m.merit_name.toLowerCase() + m.rating)
    return {
      mobility: mobilityPenalty(character),
      onslaught: character.onslaught,
      wound: woundPenalty(character, meritNames),
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
    const excellencyAbils = excellencies(character, nativeCharms.concat(maCharms))

    const bestParryWeapon = weaponPools.sort(sortByParry)[0] || { parry: { total: 'None', noSummary: true }}

    return {
      exaltTypeBase: exaltTypeBase(character),
      excellencyAbils: excellencyAbils,
      guile: ratings.guile(character, meritNames, penalties, excellencyAbils),
      resolve: ratings.resolve(character, meritNames, penalties, excellencyAbils),
      appearance: ratings.appearanceRating(character, meritNames),
      readIntentions: pools.readIntentions(character, meritNames, penalties, excellencyAbils),

      evasion: ratings.evasion(character, meritNames, penalties, excellencyAbils),
      bestParry: bestParryWeapon.parry,
      soak: ratings.soak(character, meritNames, spellNames),
      hardness: ratings.hardness(character),
      joinBattle: pools.joinBattle(character, meritNames, penalties, excellencyAbils),
      rush: pools.rush(character, meritNames, penalties, excellencyAbils),
      disengage: pools.disengage(character, meritNames, penalties, excellencyAbils),
      withdraw: pools.withdraw(character, meritNames, penalties, excellencyAbils),
      riseFromProne: pools.riseFromProne(character, meritNames, penalties, excellencyAbils),
      takeCover: pools.takeCover(character, meritNames, penalties, excellencyAbils),

      featOfStrength: pools.featOfStrength(character, meritNames, penalties, excellencyAbils),
      shapeSorcery: pools.shapeSorcery(character, meritNames, penalties, excellencyAbils),
    }
  }
)(characterIdMemoizer)

export const doIOwnCharacter = createSelector(
  [getCurrentPlayer, getSpecificCharacter],
  (player, character) => character !== undefined && player.id === character.player_id
)

export const amIStOfCharacter = createSelector(
  [getCurrentPlayer, getSpecificCharacter, entities],
  (player, character, ents) => (
    character !== undefined &&
    character.chronicle_id &&
    ents.chronicles[character.chronicle_id] &&
    ents.chronicles[character.chronicle_id].st_id === player.id
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
