import { createSelector } from 'reselect'
import createCachedSelector from 're-reselect'

import { chronicleSortOrderSort } from 'utils'
import { canISeeBattlegroup } from './battlegroup.js'
import { canISeeCharacter } from './character.js'
import { canISeeQc } from './qc.js'

const getState = (state) => state
const getCurrentPlayer = (state) => state.entities.players[state.session.id]

export const getSpecificChronicle = (state, id) => state.entities.chronicles[id]
const idMemoizer = (state, id) => id

const getPlayers = (state) => state.entities.players
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

const getCharacters = (state) => state.entities.characters
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

const getQcs = (state) => state.entities.qcs
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

const getBattlegroups = (state) => state.entities.battlegroups
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

export const amIStOfChronicle = createSelector(
  [getCurrentPlayer, getSpecificChronicle, getState],
  (player, chronicle) => chronicle && player.id === chronicle.st_id
)
