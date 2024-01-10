import createCachedSelector from 're-reselect'
import type { OutputSelector } from 'reselect'
import { createSelector } from 'reselect'

import type { WrappedEntityState } from 'ducks/entities'
import { sortOrderSort } from 'utils'
import { exaltTypeBase, mobilityPenalty, woundPenalty } from 'utils/calculated/'
import { excellencyAbils as excellencies } from 'utils/calculated/excellencies'
import * as pools from 'utils/calculated/pools'
import * as ratings from 'utils/calculated/ratings'
import type { Character, Poison, Spell, fullMerit } from 'utils/flow-types'
import {
  getMartialArtsCharmsForCharacter,
  getNativeCharmsForCharacter,
} from './charm'
import type { entitySelector } from './entities'
import { entities, getCurrentPlayer } from './entities'
import { getPoolsForWeapon, sortByParry } from './weapon'

const getState = (state: WrappedEntityState) => state

const getPoisons = (state: WrappedEntityState) => entities(state).poisons

export const getSpecificCharacter = (
  state: WrappedEntityState,
  id: number,
): Character => entities(state).characters[id]

const characterIdMemoizer = (state, id: number) => id

const getMerits = (state) => entities(state).merits

type CachedEntitySelector<T> = OutputSelector<WrappedEntityState, any, T>
type gMFC = CachedEntitySelector<fullMerit[]>
export const getMeritsForCharacter: gMFC = createCachedSelector(
  [getSpecificCharacter, getMerits],
  (character, merits) =>
    character.merits.map((m) => merits[m]).sort(sortOrderSort),
)(characterIdMemoizer)
export const getMeritNamesForCharacter = (
  state: WrappedEntityState,
  id: number,
): string[] =>
  getMeritsForCharacter(state, id)
    .map((m) => m.merit_name.toLowerCase() + m.rating)
    .sort()
export const getEvokableMeritsForCharacter: gMFC = createSelector(
  [getMeritsForCharacter],
  (merits) =>
    merits.filter(
      (m) =>
        m.merit_name.toLowerCase() == 'artifact' ||
        m.merit_name.toLowerCase() == 'hearthstone',
    ),
)

const getSpells = (state) => entities(state).spells

type gSFC = CachedEntitySelector<Spell[]>
export const getSpellsForCharacter: gSFC = createCachedSelector(
  [getSpecificCharacter, getSpells],
  (character, spells) =>
    character.spells.map((s) => spells[s]).sort(sortOrderSort),
)(characterIdMemoizer)
export const getControlSpellsForCharacter = (
  state: WrappedEntityState,
  id: number,
): Spell[] => getSpellsForCharacter(state, id).filter((s) => s.control)
type gPFC = CachedEntitySelector<Poison[]>
export const getPoisonsForCharacter: gPFC = () => []
// TODO: Poison penalties stack: http://forum.theonyxpath.com/forum/main-category/exalted/1069023-ask-the-devs?p=1173001#post1173001 */
// TODO: Poison penalties only effect static ratings:

/* http://forum.theonyxpath.com/forum/main-category/exalted/1069023-ask-the-devs?p=1207071#post1207071
 * even though the DB Integrity excellency says it negates penalties from poison:
 * http://forum.theonyxpath.com/forum/main-category/exalted/1069023-ask-the-devs?p=1207986#post1207986
 */
// @ts-expect-error
export const getPenalties = createCachedSelector(
  [getSpecificCharacter, getMeritNamesForCharacter, getPoisonsForCharacter],
  (character, meritNames, poisons) => {
    const worstPoison = poisons.reduce(
      (prev, current) => (prev.penalty > current.penalty ? prev : current),
      {
        name: 'not poisoned',
        penalty: 0,
      },
    )
    return {
      mobility: mobilityPenalty(character),
      onslaught: character.onslaught,
      wound: woundPenalty(character, meritNames),
      poisonTotal: worstPoison.penalty,
    }
  },
)(characterIdMemoizer)
// @ts-expect-error
export const getPoolsForAllWeaponsForCharacter = createCachedSelector(
  [getSpecificCharacter, getState],
  (character, state) =>
    character.weapons.map((id) => getPoolsForWeapon(state, id)),
)(characterIdMemoizer)
// @ts-expect-error
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
    weaponPools,
  ) => {
    const spellNames = spells.map((m) => m.name.toLowerCase())
    const excellencyAbils = excellencies(
      character,
      nativeCharms.concat(maCharms),
    )
    const bestParryWeapon = weaponPools.sort(sortByParry)[0] || {
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
export const doIOwnCharacter: entitySelector<boolean> = createSelector(
  [getCurrentPlayer, getSpecificCharacter],
  (player, character) =>
    character !== undefined && player.id === character.player_id,
)
export const amIStOfCharacter: entitySelector<boolean> = createSelector(
  [getCurrentPlayer, getSpecificCharacter, entities],
  (player, character, ents) =>
    character?.chronicle_id != null &&
    ents.chronicles[character.chronicle_id] &&
    ents.chronicles[character.chronicle_id].st_id === player.id,
)
export const canISeeCharacter: entitySelector<boolean> = createSelector(
  [getSpecificCharacter, doIOwnCharacter, amIStOfCharacter],
  (character, doI, amI) => !character.hidden || doI || amI,
)
export const canIEditCharacter: entitySelector<boolean> = createSelector(
  [doIOwnCharacter, amIStOfCharacter],
  (doI, amI) => doI || amI,
)
export const canIDeleteCharacter = doIOwnCharacter
