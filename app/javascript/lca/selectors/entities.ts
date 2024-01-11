import { createSelector, OutputSelector } from 'reselect'

import { sortOrderSort } from 'utils'
import type { EntityState, WrappedEntityState } from 'ducks/entities'
import type { Player } from 'utils/flow-types'

export type entitySelector<T> = OutputSelector<WrappedEntityState, any, T>

export const entities = (state: WrappedEntityState): EntityState =>
  state.entities.current

export const getSpecificPlayer = (
  state: WrappedEntityState,
  id: number,
): Player => ({
  characters: [],
  qcs: [],
  battlegroups: [],
  chronicles: [],
  own_chronicles: [],
  ...entities(state).players[id],
})

export const getCurrentPlayer = (state: WrappedEntityState): Player =>
  getSpecificPlayer(state, state.session.id)

const getCharacters = (state: WrappedEntityState) => entities(state).characters

export const getMyCharacters = createSelector(
  [getCurrentPlayer, getCharacters],
  (currentPlayer, characters) =>
    currentPlayer.characters.map((c) => characters[c]).sort(sortOrderSort),
)
export const getMyCharactersWithoutChronicles = createSelector(
  [getMyCharacters],
  (characters) => characters.filter((c) => c.chronicle_id == null),
)

const getQCs = (state: WrappedEntityState) => entities(state).qcs

export const getMyQCs = createSelector(
  [getCurrentPlayer, getQCs],
  (currentPlayer, qcs) =>
    currentPlayer.qcs.map((c) => qcs[c]).sort(sortOrderSort),
)
export const getMyQcsWithoutChronicles = createSelector([getMyQCs], (qcs) =>
  qcs.filter((c) => c.chronicle_id == null),
)

const getBattlegroups = (state: WrappedEntityState) =>
  entities(state).battlegroups

export const getMyBattlegroups = createSelector(
  [getCurrentPlayer, getBattlegroups],
  (currentPlayer, battlegroups) =>
    currentPlayer.battlegroups.map((c) => battlegroups[c]).sort(sortOrderSort),
)
export const getMyBattlegroupsWithoutChronicles = createSelector(
  [getMyBattlegroups],
  (battlegroups) => battlegroups.filter((c) => c.chronicle_id == null),
)
