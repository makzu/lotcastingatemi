import { createAction } from '@reduxjs/toolkit'

import { createApiActions, createTraitReducer } from './_trait'
import { EntityState } from './_types'

export const updateQcMeritSort = createAction<{ id: number; sorting: number }>(
  'sort/qc_merit',
)
export default createTraitReducer('qc_merit', 'qc', {
  [updateQcMeritSort.toString()]: (
    state: EntityState,
    action: ReturnType<typeof updateQcMeritSort>,
  ) => {
    const { id, sorting } = action.payload
    state.qc_merits[id].sorting = sorting
  },
})

export const [createQcMerit, updateQcMerit, destroyQcMerit] = createApiActions(
  'qc_merit',
  'qc',
)
