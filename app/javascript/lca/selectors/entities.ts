import { createSelector } from 'reselect'

import { type RootState } from '@/store'
import { getMyCharacters, getMyQcs, type EntityState } from 'ducks/entities'

export const entities = (state: RootState): EntityState =>
  state.entities.current

export const getSpecificPlayer = (state: RootState, id: number) =>
  entities(state).players[id]

export const getCurrentPlayer = (state: RootState) =>
  getSpecificPlayer(state, state.session.id)

export const getMyCharactersWithoutChronicles = createSelector(
  [getMyCharacters],
  (characters) => characters.filter((c) => c.chronicle_id == null),
)

export const getMyQcsWithoutChronicles = createSelector([getMyQcs], (qcs) =>
  qcs.filter((c) => c.chronicle_id == null),
)
