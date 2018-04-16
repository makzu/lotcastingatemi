// @flow
import { createSelector } from 'reselect'
import { sortOrderSort } from '../utils'

const entities = (state) => state.entities.current

export const getSpecificPlayer = (state: Object, id: number) => entities(state).players[id]
const getCurrentPlayer = (state) => getSpecificPlayer(state, state.session.id)

const getCharacters = (state) => entities(state).characters
export const getMyCharacters = createSelector(
  [getCurrentPlayer, getCharacters],
  (currentPlayer, characters) =>
    currentPlayer.characters.map((c) => characters[c] ).sort(sortOrderSort)
)
export const getMyPinnedCharacters = createSelector(
  [getMyCharacters],
  (characters) => characters.filter((c) => c.pinned)
)
export const getMyCharactersWithoutChronicles = createSelector(
  [getMyCharacters],
  (characters) => characters.filter((c) => c.chronicle_id == undefined)
)

const getQCs = (state) => entities(state).qcs
export const getMyQCs = createSelector(
  [getCurrentPlayer, getQCs],
  (currentPlayer, qcs) =>
    currentPlayer.qcs.map((c) => qcs[c] ).sort(sortOrderSort)
)
export const getMyPinnedQCs = createSelector(
  [getMyQCs],
  (qcs) => qcs.filter((c) => c.pinned)
)
export const getMyQcsWithoutChronicles = createSelector(
  [getMyQCs],
  (qcs) => qcs.filter((c) => c.chronicle_id == undefined)
)

const getBattlegroups = (state) => entities(state).battlegroups
export const getMyBattlegroups = createSelector(
  [getCurrentPlayer, getBattlegroups],
  (currentPlayer, battlegroups) =>
    currentPlayer.battlegroups.map((c) => battlegroups[c] ).sort(sortOrderSort)
)
export const getMyPinnedBattlegroups = createSelector(
  [getMyBattlegroups],
  (battlegroups) => battlegroups.filter((c) => c.pinned)
)
export const getMyBattlegroupsWithoutChronicles = createSelector(
  [getMyBattlegroups],
  (battlegroups) => battlegroups.filter((c) => c.chronicle_id == undefined)
)
