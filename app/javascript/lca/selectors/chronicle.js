import { createSelector } from 'reselect'
import createCachedSelector from 're-reselect'

const getState = (state) => state
const getCurrentPlayer = (state) => state.entities.players[state.session.id]

export const getSpecificChronicle = (state, id) => state.entities.chronicles[id]
const idMemoizer = (state, id) => id

const getCharacters = (state) => state.entities.characters
export const getCharactersForChronicle = createCachedSelector(
  [getSpecificChronicle, getCharacters],
  (chronicle, characters) => chronicle.characters.map((c) => characters[c]) || []
)(idMemoizer)

const getQcs = (state) => state.entities.qcs
export const getQcsForChronicle = createCachedSelector(
  [getSpecificChronicle, getQcs],
  (chronicle, qcs) => chronicle.qcs.map((c) => qcs[c]) || []
)(idMemoizer)

const getBattlegroups = (state) => state.entities.battlegroups
export const getBattlegroupsForChronicle = createCachedSelector(
  [getSpecificChronicle, getBattlegroups],
  (chronicle, battlegroups) => chronicle.battlegroups.map((c) => battlegroups[c]) || []
)(idMemoizer)

export const canIEditChronicle = createSelector(
  [getCurrentPlayer, getSpecificChronicle, getState],
  (player, chronicle) => player.id === chronicle.st_id
)
