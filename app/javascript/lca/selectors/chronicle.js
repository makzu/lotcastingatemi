import { createSelector } from 'reselect'
import createCachedSelector from 're-reselect'

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
  [getSpecificChronicle, getCharacters],
  (chronicle, characters) =>
    ( chronicle &&
      chronicle.characters &&
      chronicle.characters.map((c) => characters[c])
    ) || []
)(idMemoizer)

const getQcs = (state) => state.entities.qcs
export const getQcsForChronicle = createCachedSelector(
  [getSpecificChronicle, getQcs],
  (chronicle, qcs) =>
    ( chronicle &&
      chronicle.qcs &&
      chronicle.qcs.map((c) => qcs[c])
    ) || []
)(idMemoizer)

const getBattlegroups = (state) => state.entities.battlegroups
export const getBattlegroupsForChronicle = createCachedSelector(
  [getSpecificChronicle, getBattlegroups],
  (chronicle, battlegroups) =>
    ( chronicle &&
      chronicle.battlegroups &&
      chronicle.battlegroups.map((c) => battlegroups[c])
    ) || []
)(idMemoizer)

export const amIStOfChronicle = createSelector(
  [getCurrentPlayer, getSpecificChronicle, getState],
  (player, chronicle) => chronicle && player.id === chronicle.st_id
)
