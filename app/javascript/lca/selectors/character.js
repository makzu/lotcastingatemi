// @flow
import { createSelector, type OutputSelector } from 'reselect'
import createCachedSelector from 're-reselect'
import { isEmpty, max } from 'lodash'

import {
  getNativeCharmsForCharacter,
  getMartialArtsCharmsForCharacter,
} from './charm.js'
import { entities, getCurrentPlayer, type entitySelector } from './entities.js'
import { getPoolsForWeapon, sortByParry } from './weapon.js'
import { sortOrderSort } from 'utils'
import { woundPenalty, mobilityPenalty, exaltTypeBase } from 'utils/calculated/'
import { excellencyAbils as excellencies } from 'utils/calculated/excellencies'
import * as pools from 'utils/calculated/pools'
import * as ratings from 'utils/calculated/ratings'

import type { WrappedEntityState } from 'ducks/entities'
import type {
  Character,
  fullMerit,
  fullWeapon,
  Spell,
  Poison,
} from 'utils/flow-types'

const getState = (state: WrappedEntityState) => state
const getPoisons = (state: WrappedEntityState) => entities(state).poisons

export const getSpecificCharacter = (
  state: WrappedEntityState,
  id: number
): Character => entities(state).characters[id]

const characterIdMemoizer = (state, id: number) => id

const getMerits = state => entities(state).merits

type CachedEntitySelector<T> = OutputSelector<WrappedEntityState, any, T>

type gMFC = CachedEntitySelector<Array<fullMerit>>
export const getMeritsForCharacter: gMFC = createCachedSelector(
  [getSpecificCharacter, getMerits],
  (character, merits) =>
    character.merits.map(m => merits[m]).sort(sortOrderSort)
)(characterIdMemoizer)

export const getMeritNamesForCharacter = (
  state: WrappedEntityState,
  id: number
): Array<string> =>
  getMeritsForCharacter(state, id)
    .map(m => m.merit_name.toLowerCase() + m.rating)
    .sort()

export const getEvokableMeritsForCharacter: gMFC = createSelector(
  [getMeritsForCharacter],
  merits =>
    merits.filter(
      m =>
        m.merit_name.toLowerCase() == 'artifact' ||
        m.merit_name.toLowerCase() == 'hearthstone'
    )
)

const getWeapons = state => entities(state).weapons
type gWFC = CachedEntitySelector<Array<fullWeapon>>
export const getWeaponsForCharacter: gWFC = createCachedSelector(
  [getSpecificCharacter, getWeapons],
  (character, weapons) =>
    character.weapons.map(w => weapons[w]).sort(sortOrderSort)
)(characterIdMemoizer)

const getSpells = state => entities(state).spells
type gSFC = CachedEntitySelector<Array<Spell>>
export const getSpellsForCharacter: gSFC = createCachedSelector(
  [getSpecificCharacter, getSpells],
  (character, spells) =>
    character.spells.map(s => spells[s]).sort(sortOrderSort)
)(characterIdMemoizer)

export const getControlSpellsForCharacter = (
  state: WrappedEntityState,
  id: number
): Array<Spell> => getSpellsForCharacter(state, id).filter(s => s.control)

type gPFC = CachedEntitySelector<Array<Poison>>
export const getPoisonsForCharacter: gPFC = createCachedSelector(
  [getSpecificCharacter, getPoisons],
  (character, poisons) =>
    character.poisons.map(p => poisons[p]).sort(sortOrderSort)
)(characterIdMemoizer)

// $FlowFixMe
export const getPenalties = createCachedSelector(
  [getSpecificCharacter, getMeritNamesForCharacter, getPoisonsForCharacter],
  (character, meritNames, poisons) => {
    let poisonMax = isEmpty(poisons) ? 0 : max(poisons, p => p.penalty).penalty
    return {
      mobility: mobilityPenalty(character),
      onslaught: character.onslaught,
      wound: woundPenalty(character, meritNames),
      poisonTotal: poisonMax,
    }
  }
)(characterIdMemoizer)

// $FlowFixMe
export const getPoolsForAllWeaponsForCharacter = createCachedSelector(
  [getSpecificCharacter, getState],
  (character, state) =>
    character.weapons.map(id => getPoolsForWeapon(state, id))
)(characterIdMemoizer)

// $FlowFixMe
export const getPoolsAndRatings = createCachedSelector(
  [
    getSpecificCharacter,
    getMeritNamesForCharacter,
    getNativeCharmsForCharacter,
    getMartialArtsCharmsForCharacter,
    getControlSpellsForCharacter,
    getPenalties,
    getPoolsForAllWeaponsForCharacter,
  ],
  (
    character,
    meritNames,
    nativeCharms,
    maCharms,
    spells,
    penalties,
    weaponPools
  ) => {
    const spellNames = spells.map(m => m.name.toLowerCase())
    const excellencyAbils = excellencies(
      character,
      nativeCharms.concat(maCharms)
    )

    const bestParryWeapon = weaponPools.sort(sortByParry)[0] || {
      parry: { total: 'None', noSummary: true },
    }

    return {
      exaltTypeBase: exaltTypeBase(character),
      excellencyAbils: excellencyAbils,
      guile: ratings.guile(character, meritNames, penalties, excellencyAbils),
      resolve: ratings.resolve(
        character,
        meritNames,
        penalties,
        excellencyAbils
      ),
      appearance: ratings.appearanceRating(character, meritNames),
      readIntentions: pools.readIntentions(
        character,
        meritNames,
        penalties,
        excellencyAbils
      ),

      evasion: ratings.evasion(
        character,
        meritNames,
        penalties,
        excellencyAbils
      ),
      bestParry: bestParryWeapon.parry,
      soak: ratings.soak(character, meritNames, spellNames),
      hardness: ratings.hardness(character),
      joinBattle: pools.joinBattle(
        character,
        meritNames,
        penalties,
        excellencyAbils
      ),
      rush: pools.rush(character, meritNames, penalties, excellencyAbils),
      disengage: pools.disengage(
        character,
        meritNames,
        penalties,
        excellencyAbils
      ),
      withdraw: pools.withdraw(
        character,
        meritNames,
        penalties,
        excellencyAbils
      ),
      riseFromProne: pools.riseFromProne(
        character,
        meritNames,
        penalties,
        excellencyAbils
      ),
      takeCover: pools.takeCover(
        character,
        meritNames,
        penalties,
        excellencyAbils
      ),

      featOfStrength: pools.featOfStrength(
        character,
        meritNames,
        penalties,
        excellencyAbils
      ),
      shapeSorcery: pools.shapeSorcery(
        character,
        meritNames,
        penalties,
        excellencyAbils
      ),
    }
  }
)(characterIdMemoizer)

export const doIOwnCharacter: entitySelector<boolean> = createSelector(
  [getCurrentPlayer, getSpecificCharacter],
  (player, character) =>
    character !== undefined && player.id === character.player_id
)

export const amIStOfCharacter: entitySelector<boolean> = createSelector(
  [getCurrentPlayer, getSpecificCharacter, entities],
  (player, character, ents) =>
    character != null &&
    character.chronicle_id != null &&
    ents.chronicles[character.chronicle_id] &&
    ents.chronicles[character.chronicle_id].st_id === player.id
)

export const canISeeCharacter: entitySelector<boolean> = createSelector(
  [getSpecificCharacter, doIOwnCharacter, amIStOfCharacter],
  (character, doI, amI) => !character.hidden || doI || amI
)

export const canIEditCharacter: entitySelector<boolean> = createSelector(
  [doIOwnCharacter, amIStOfCharacter],
  (doI, amI) => doI || amI
)

export const canIDeleteCharacter = doIOwnCharacter
