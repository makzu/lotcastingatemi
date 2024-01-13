import createCachedSelector from 're-reselect'
import { createSelector } from 'reselect'

import { getSpecificCharacter as getCharacter } from '@/ducks/entities/character'
import { RootState } from '@/store'
import type { Poison, Spell } from '@/types'
import { sortOrderSort } from '@/utils'
import {
  exaltTypeBase,
  mobilityPenalty,
  woundPenalty,
} from '@/utils/calculated/'
import { excellencyAbils as excellencies } from '@/utils/calculated/excellencies'
import * as pools from '@/utils/calculated/pools'
import * as ratings from '@/utils/calculated/ratings'
import {
  getControlSpellsForCharacter,
  getMartialArtsCharmsForCharacter,
  getNativeCharmsForCharacter,
} from './charm'
import { entities, getCurrentPlayer } from './entities'
import { getPoolsForWeapon, sortByParry } from './weapon'

const getState = (state) => state
// const getPoisons = (state) => entities(state).poisons

const characterIdMemoizer = (_state, id: number) => id

const getMerits = (state: RootState) => entities(state).merits

export const getMeritsForCharacter = createCachedSelector(
  [getCharacter, getMerits],
  (character, merits) =>
    character.merits.map((m) => merits[m]).sort(sortOrderSort),
)(characterIdMemoizer)

export const getMeritNamesForCharacter = (state, id: number): string[] =>
  getMeritsForCharacter(state, id)
    .map((m) => m.merit_name.toLowerCase() + m.rating)
    .sort()

export const getEvokableMeritsForCharacter = createSelector(
  [getMeritsForCharacter],
  (merits) =>
    merits.filter(
      (m) =>
        m.merit_name.toLowerCase() == 'artifact' ||
        m.merit_name.toLowerCase() == 'hearthstone',
    ),
)

/** @deprecated use export from 'ducks' instead */
export const getSpecificCharacter = getCharacter

const getSpells = (state) => entities(state).spells

export const getPoisonsForCharacter = () => [] as Poison[]

// TODO: Poison penalties stack: http://forum.theonyxpath.com/forum/main-category/exalted/1069023-ask-the-devs?p=1173001#post1173001 */
// TODO: Poison penalties only effect static ratings:

/* http://forum.theonyxpath.com/forum/main-category/exalted/1069023-ask-the-devs?p=1207071#post1207071
 * even though the DB Integrity excellency says it negates penalties from poison:
 * http://forum.theonyxpath.com/forum/main-category/exalted/1069023-ask-the-devs?p=1207986#post1207986
 */

export const getPenalties = createCachedSelector(
  [getCharacter, getMeritNamesForCharacter, getPoisonsForCharacter],
  (character, meritNames, _poisons) => {
    // let worstPoison = poisons.reduce(
    //   (prev, current) => (prev.penalty > current.penalty ? prev : current),
    //   { name: 'not poisoned', penalty: 0 },
    // )

    return {
      mobility: mobilityPenalty(character),
      onslaught: character.onslaught,
      wound: woundPenalty(character, meritNames),
      poisonTotal: 0, //worstPoison.penalty,
    }
  },
)(characterIdMemoizer)

export const getPoolsForAllWeaponsForCharacter = createCachedSelector(
  [getCharacter, getState],
  (character, state) =>
    (character?.weapons ?? []).map((id) => getPoolsForWeapon(state, id)),
)(characterIdMemoizer)

export const getPoolsAndRatings = createCachedSelector(
  [
    getCharacter,
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
    weaponPools,
  ) => {
    if (character == null) return null

    const spellNames = spells.map((m) => m.name.toLowerCase())
    const excellencyAbils = excellencies(
      character,
      nativeCharms.concat(maCharms),
    )
    const bestParryWeapon = weaponPools.sort(sortByParry)[0] ?? {
      parry: {
        total: 'None',
        noSummary: true,
      },
    }
    return {
      exaltTypeBase: exaltTypeBase(character),
      excellencyAbils: excellencyAbils,
      guile: ratings.guile(character, meritNames, penalties, excellencyAbils),
      resolve: ratings.resolve(
        character,
        meritNames,
        penalties,
        excellencyAbils,
      ),
      appearance: ratings.appearanceRating(character, meritNames),
      readIntentions: pools.readIntentions(
        character,
        meritNames,
        penalties,
        excellencyAbils,
      ),
      evasion: ratings.evasion(
        character,
        meritNames,
        penalties,
        excellencyAbils,
      ),
      bestParry: bestParryWeapon.parry,
      soak: ratings.soak(character, meritNames, spellNames),
      hardness: ratings.hardness(character),
      joinBattle: pools.joinBattle(
        character,
        meritNames,
        penalties,
        excellencyAbils,
      ),
      rush: pools.rush(character, meritNames, penalties, excellencyAbils),
      disengage: pools.disengage(
        character,
        meritNames,
        penalties,
        excellencyAbils,
      ),
      withdraw: pools.withdraw(
        character,
        meritNames,
        penalties,
        excellencyAbils,
      ),
      riseFromProne: pools.riseFromProne(
        character,
        meritNames,
        penalties,
        excellencyAbils,
      ),
      takeCover: pools.takeCover(
        character,
        meritNames,
        penalties,
        excellencyAbils,
      ),
      featOfStrength: pools.featOfStrength(
        character,
        meritNames,
        penalties,
        excellencyAbils,
      ),
      shapeSorcery: pools.shapeSorcery(
        character,
        meritNames,
        penalties,
        excellencyAbils,
      ),
    }
  },
)(characterIdMemoizer)

export const doIOwnCharacter = createSelector(
  [getCurrentPlayer, getCharacter],
  (player, character) =>
    character !== undefined && player.id === character.player_id,
)

export const amIStOfCharacter = createSelector(
  [getCurrentPlayer, getCharacter, entities],
  (player, character, ents) =>
    character?.chronicle_id != null &&
    ents.chronicles[character.chronicle_id] &&
    ents.chronicles[character.chronicle_id]?.st_id === player.id,
)

export const canISeeCharacter = createSelector(
  [getCharacter, doIOwnCharacter, amIStOfCharacter],
  (character, doI, amI) => !character?.hidden || doI || amI,
)

export const canIEditCharacter = createSelector(
  [doIOwnCharacter, amIStOfCharacter],
  (doI, amI) => doI || amI,
)

export const canIDeleteCharacter = doIOwnCharacter
