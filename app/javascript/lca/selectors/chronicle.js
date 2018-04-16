// @flow
import { createSelector } from 'reselect'
import createCachedSelector from 're-reselect'

import { chronicleSortOrderSort } from 'utils'
import { canISeeBattlegroup } from './battlegroup.js'
import { canISeeCharacter } from './character.js'
import { canISeeQc } from './qc.js'

const entities = (state) => state.entities.current
const getState = (state) => state
const getCurrentPlayer = (state) => entities(state).players[state.session.id]

export const getSpecificChronicle = (state: Object, id: number) => entities(state).chronicles[id]
const idMemoizer = (state, id) => id

const getPlayers = (state) => entities(state).players
export const getPlayersForChronicle = createCachedSelector(
  [getSpecificChronicle, getPlayers],
  (chronicle, players) =>
    ( chronicle &&
      chronicle.players &&
      chronicle.players.map((c) => players[c])
    ) || []
)(idMemoizer)
export const getStorytellerForChronicle = createCachedSelector(
  [getSpecificChronicle, getPlayers],
  (chronicle, players) => chronicle && chronicle.st_id && players[chronicle.st_id]
)(idMemoizer)

const getCharacters = (state) => entities(state).characters
export const getCharactersForChronicle = createCachedSelector(
  [getSpecificChronicle, getCharacters, getState],
  (chronicle, characters, state) =>
    ( chronicle &&
      chronicle.characters &&
      chronicle.characters
        .map((c) => characters[c])
        .filter((c) => canISeeCharacter(state, c.id))
        .sort(chronicleSortOrderSort)
    ) || []
)(idMemoizer)

const getQcs = (state) => entities(state).qcs
export const getQcsForChronicle = createCachedSelector(
  [getSpecificChronicle, getQcs, getState],
  (chronicle, qcs, state) =>
    ( chronicle &&
      chronicle.qcs &&
      chronicle.qcs
        .map((c) => qcs[c])
        .filter((c) => canISeeQc(state, c.id))
        .sort(chronicleSortOrderSort)
    ) || []
)(idMemoizer)

const getBattlegroups = (state) => entities(state).battlegroups
export const getBattlegroupsForChronicle = createCachedSelector(
  [getSpecificChronicle, getBattlegroups, getState],
  (chronicle, battlegroups, state) =>
    ( chronicle &&
      chronicle.battlegroups &&
      chronicle.battlegroups
        .map((c) => battlegroups[c])
        .filter((c) => canISeeBattlegroup(state, c.id))
        .sort(chronicleSortOrderSort)
    ) || []
)(idMemoizer)

export const amIStOfChronicle = createCachedSelector(
  [getCurrentPlayer, getSpecificChronicle],
  (player, chronicle) => chronicle && chronicle.st_id && player.id === chronicle.st_id
)((state, id) => (getSpecificChronicle(state, id) || {}).st_id)
