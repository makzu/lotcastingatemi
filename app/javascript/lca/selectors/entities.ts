import { createSelector } from 'reselect'
import { sortOrderSort } from 'utils'
import type { EntityState } from 'ducks/entities'
import type { Player } from 'types'
import { RootState } from 'store'

export const entities = (state: RootState): EntityState =>
  state.entities.current

export const getSpecificPlayer = (state: RootState, id: number): Player => ({
  characters: [],
  qcs: [],
  battlegroups: [],
  chronicles: [],
  own_chronicles: [],
  ...entities(state).players[id],
})

export const getCurrentPlayer = (state: RootState): Player =>
  getSpecificPlayer(state, state.session.id)

const getCharacters = (state: RootState) => entities(state).characters

export const getMyCharacters = createSelector(
  [getCurrentPlayer, getCharacters],
  (currentPlayer, characters) =>
    currentPlayer.characters.map((c) => characters[c]).sort(sortOrderSort),
)

export const getMyCharactersWithoutChronicles = createSelector(
  [getMyCharacters],
  (characters) => characters.filter((c) => c.chronicle_id == null),
)

const getQCs = (state: RootState) => entities(state).qcs

export const getMyQCs = createSelector(
  [getCurrentPlayer, getQCs],
  (currentPlayer, qcs) =>
    currentPlayer.qcs.map((c) => qcs[c]).sort(sortOrderSort),
)

export const getMyQcsWithoutChronicles = createSelector([getMyQCs], (qcs) =>
  qcs.filter((c) => c.chronicle_id == null),
)

const getBattlegroups = (state: RootState) => entities(state).battlegroups

export const getMyBattlegroups = createSelector(
  [getCurrentPlayer, getBattlegroups],
  (currentPlayer, battlegroups) =>
    currentPlayer.battlegroups.map((c) => battlegroups[c]).sort(sortOrderSort),
)

export const getMyBattlegroupsWithoutChronicles = createSelector(
  [getMyBattlegroups],
  (battlegroups) => battlegroups.filter((c) => c.chronicle_id == null),
)
