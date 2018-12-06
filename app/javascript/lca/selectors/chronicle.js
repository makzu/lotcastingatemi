// @flow
import createCachedSelector from 're-reselect'

import { chronicleSortOrderSort } from 'utils'
import { canISeeBattlegroup } from './battlegroup.js'
import { canISeeCharacter } from './character.js'
import { entities, getCurrentPlayer } from './entities.js'
import { canISeeQc } from './qc.js'
import type { WrappedEntityState } from 'ducks/entities'

const getState = state => state

export const getSpecificChronicle = (state: WrappedEntityState, id: number) =>
  entities(state).chronicles[id]

const idMemoizer = (state, id) => id

const getPlayers = state => entities(state).players

export const isChronicleLoaded = (state: WrappedEntityState, id: number) =>
  (getSpecificChronicle(state, id) || {}).st != null

// $FlowFixMe
export const getPlayersForChronicle = createCachedSelector(
  [getSpecificChronicle, isChronicleLoaded, getPlayers],
  (chronicle, loaded, players) =>
    loaded ? chronicle.players.map(c => players[c]) : []
)(idMemoizer)

// $FlowFixMe
export const getStorytellerForChronicle = createCachedSelector(
  [getSpecificChronicle, getPlayers],
  (chronicle, players) =>
    chronicle && chronicle.st_id && players[chronicle.st_id]
)(idMemoizer)

const getCharacters = state => entities(state).characters

// $FlowFixMe
export const getCharactersForChronicle = createCachedSelector(
  [getSpecificChronicle, getCharacters, getState],
  (chronicle, characters, state) =>
    (chronicle &&
      chronicle.characters &&
      chronicle.characters
        .map(c => characters[c])
        .filter(c => canISeeCharacter(state, c.id))
        .sort(chronicleSortOrderSort)) ||
    []
)(idMemoizer)

const getQcs = state => entities(state).qcs

// $FlowFixMe
export const getQcsForChronicle = createCachedSelector(
  [getSpecificChronicle, getQcs, getState],
  (chronicle, qcs, state) =>
    (chronicle &&
      chronicle.qcs &&
      chronicle.qcs
        .map(c => qcs[c])
        .filter(c => canISeeQc(state, c.id))
        .sort(chronicleSortOrderSort)) ||
    []
)(idMemoizer)

const getBattlegroups = state => entities(state).battlegroups

// $FlowFixMe
export const getBattlegroupsForChronicle = createCachedSelector(
  [getSpecificChronicle, getBattlegroups, getState],
  (chronicle, battlegroups, state) =>
    (chronicle &&
      chronicle.battlegroups &&
      chronicle.battlegroups
        .map(c => battlegroups[c])
        .filter(c => canISeeBattlegroup(state, c.id))
        .sort(chronicleSortOrderSort)) ||
    []
)(idMemoizer)

// $FlowFixMe
export const amIStOfChronicle = createCachedSelector(
  [getCurrentPlayer, getSpecificChronicle],
  (player, chronicle) =>
    chronicle && chronicle.st_id && player.id === chronicle.st_id
)((state, id) => (getSpecificChronicle(state, id) || { st_id: 0 }).st_id)
