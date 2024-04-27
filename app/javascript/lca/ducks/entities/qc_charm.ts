import { createAction } from '@reduxjs/toolkit'

import { createApiActions, createTraitReducer } from './_trait'
import { type EntityState } from './_types'

export const updateQcCharmSort = createAction<{ id: number; sorting: number }>(
  'sort/qc_charm',
)
export default createTraitReducer('qc_charm', 'qc', {
  [updateQcCharmSort.toString()]: (
    state: EntityState,
    action: ReturnType<typeof updateQcCharmSort>,
  ) => {
    const { id, sorting } = action.payload
    state.qc_charms[id].sorting = sorting
  },
})

export const [createQcCharm, updateQcCharm, destroyQcCharm] = createApiActions(
  'qc_charm',
  'qc',
)
