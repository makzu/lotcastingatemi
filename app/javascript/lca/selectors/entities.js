import { createSelector } from 'reselect'
import { sortOrderSort } from '../utils'

const getCurrentPlayer = (state) => state.entities.players[state.session.id]

const getCharacters = (state) => state.entities.characters
export const getMyCharacters = createSelector(
  [getCurrentPlayer, getCharacters],
  (currentPlayer, characters) =>
    sortOrderSort(currentPlayer.characters.map((c) => characters[c] ))
)
export const getMyPinnedCharacters = createSelector(
  [getMyCharacters],
  (characters) => characters.filter((c) => c.pinned)
)
export const getMyCharactersWithoutChronicles = createSelector(
  [getMyCharacters],
  (characters) => characters.filter((c) => c.chronicle_id == undefined)
)

const getQCs = (state) => state.entities.qcs
export const getMyQCs = createSelector(
  [getCurrentPlayer, getQCs],
  (currentPlayer, qcs) =>
    sortOrderSort(currentPlayer.qcs.map((c) => qcs[c] ))
)
export const getMyPinnedQCs = createSelector(
  [getMyQCs],
  (qcs) => qcs.filter((c) => c.pinned)
)
export const getMyQcsWithoutChronicles = createSelector(
  [getMyQCs],
  (qcs) => qcs.filter((c) => c.chronicle_id == undefined)
)

const getBattlegroups = (state) => state.entities.battlegroups
export const getMyBattlegroups = createSelector(
  [getCurrentPlayer, getBattlegroups],
  (currentPlayer, battlegroups) =>
    sortOrderSort(currentPlayer.battlegroups.map((c) => battlegroups[c] ))
)
export const getMyPinnedBattlegroups = createSelector(
  [getMyBattlegroups],
  (battlegroups) => battlegroups.filter((c) => c.pinned)
)
export const getMyBattlegroupsWithoutChronicles = createSelector(
  [getMyBattlegroups],
  (battlegroups) => battlegroups.filter((c) => c.chronicle_id == undefined)
)
