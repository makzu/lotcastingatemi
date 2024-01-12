import { createSelector } from 'reselect'

import {
  EntityState,
  WrappedEntityState,
  getMyCharacters,
  getMyQcs,
  getMyBattlegroups,
} from 'ducks/entities'

export const entities = (state: WrappedEntityState): EntityState =>
  state.entities.current

export const getSpecificPlayer = (state: WrappedEntityState, id: number) =>
  entities(state).players[id]

export const getCurrentPlayer = (state: WrappedEntityState) =>
  getSpecificPlayer(state, state.session.id)

export const getMyCharactersWithoutChronicles = createSelector(
  [getMyCharacters],
  (characters) => characters.filter((c) => c.chronicle_id == null),
)

export const getMyQcsWithoutChronicles = createSelector([getMyQcs], (qcs) =>
  qcs.filter((c) => c.chronicle_id == null),
)

export const getMyBattlegroupsWithoutChronicles = createSelector(
  [getMyBattlegroups],
  (battlegroups) => battlegroups.filter((c) => c.chronicle_id == null),
)
