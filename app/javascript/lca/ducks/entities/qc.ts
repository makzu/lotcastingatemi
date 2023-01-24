import { createSelector } from 'reselect'

import {
  createApiActions,
  createConditionalFetchAction,
  createEntityReducer,
} from './_entity'
import { unwrapped } from './_lib'
import { getCurrentPlayer } from './player'
import { RootState } from 'store'
import { sortOrderSort } from 'utils'

/* *** Reducer *** */
export default createEntityReducer('qc')

/* *** Actions *** */
export const [
  createQc,
  duplicateQc,
  fetchQc,
  fetchAllQcs,
  updateQc,
  destroyQc,
] = createApiActions('qc')

export const fetchQcIfNecessary = createConditionalFetchAction('qc', fetchQc)

/* *** Selectors *** */
const getQcs = (state: RootState) => unwrapped(state).qcs

export const getMyQcs = createSelector(
  [getCurrentPlayer, getQcs],
  (currentPlayer, qcs) =>
    (currentPlayer.qcs || []).map((c) => qcs[c]).sort(sortOrderSort),
)

export const getMyPinnedQcs = createSelector([getMyQcs], (qcs) =>
  qcs.filter((c) => c.pinned),
)

export const getMyQcsWithoutChronicles = createSelector([getMyQcs], (qcs) =>
  qcs.filter((c) => c.chronicle_id == null),
)

export const getSpecificQc = (state: RootState, id: number) =>
  unwrapped(state).qcs[id]
