import { createSelector } from 'reselect'

import type { EntityState } from '@/ducks/entities'
import { sortOrderSort } from '@/utils'

export const entities = (state): EntityState => state.entities.current

export const getSpecificPlayer = (state, id: number) =>
  entities(state).players[id]

export const getCurrentPlayer = (state) =>
  getSpecificPlayer(state, state.session.id)

const getCharacters = (state) => entities(state).characters

export const getMyCharacters = createSelector(
  [getCurrentPlayer, getCharacters],
  (currentPlayer, characters) =>
    currentPlayer.characters.map((c) => characters[c]).sort(sortOrderSort),
)

export const getMyCharactersWithoutChronicles = createSelector(
  [getMyCharacters],
  (characters) => characters.filter((c) => c.chronicle_id == null),
)

const getQCs = (state) => entities(state).qcs

export const getMyQCs = createSelector(
  [getCurrentPlayer, getQCs],
  (currentPlayer, qcs) =>
    currentPlayer.qcs.map((c) => qcs[c]).sort(sortOrderSort),
)

export const getMyQcsWithoutChronicles = createSelector([getMyQCs], (qcs) =>
  qcs.filter((c) => c.chronicle_id == null),
)

const getBattlegroups = (state) => entities(state).battlegroups

export const getMyBattlegroups = createSelector(
  [getCurrentPlayer, getBattlegroups],
  (currentPlayer, battlegroups) =>
    currentPlayer.battlegroups.map((c) => battlegroups[c]).sort(sortOrderSort),
)

export const getMyBattlegroupsWithoutChronicles = createSelector(
  [getMyBattlegroups],
  (battlegroups) => battlegroups.filter((c) => c.chronicle_id == null),
)
