import { createAction } from '@reduxjs/toolkit'
import { createSelector } from 'reselect'

import type { RootState } from '@/store'
import { isDefined, sortOrderSort } from '@/utils'
import {
  createApiActions,
  createConditionalFetchAction,
  createEntityReducer,
} from './_entity'
import { unwrapped } from './_lib'
import { type EntityState } from './_types'
import { getCurrentPlayer } from './player'

export const updateQcSort = createAction<{ id: number; sorting: number }>(
  'sort/qc',
)

export const updateQcChronicleSort = createAction<{
  id: number
  sorting: number
}>('chronicle_sort/qc')

/* *** Reducer *** */
export default createEntityReducer('qc', {
  [updateQcSort.toString()]: (
    state: EntityState,
    action: ReturnType<typeof updateQcSort>,
  ) => {
    const { id, sorting } = action.payload
    state.qcs[id].sorting = sorting
  },
  [updateQcChronicleSort.toString()]: (
    state: EntityState,
    action: ReturnType<typeof updateQcChronicleSort>,
  ) => {
    const { id, sorting } = action.payload
    state.qcs[id].chronicle_sorting = sorting
  },
})

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
    (currentPlayer?.qcs ?? [])
      .map((c) => qcs[c])
      .filter(isDefined)
      .sort(sortOrderSort),
)

export const getMyPinnedQcs = createSelector([getMyQcs], (qcs) =>
  qcs.filter((c) => c.pinned),
)

export const getMyQcsWithoutChronicles = createSelector([getMyQcs], (qcs) =>
  qcs.filter((c) => c.chronicle_id == null),
)

export const getSpecificQc = (state: RootState, id: number) =>
  unwrapped(state).qcs[id]
