import { createAction } from '@reduxjs/toolkit'

import { createApiActions, createTraitReducer } from './_trait'
import { EntityState } from './_types'

export const updateQcAttackSort = createAction<{ id: number; sorting: number }>(
  'sort/qc_attack',
)

export default createTraitReducer('qc_attack', 'qc', {
  [updateQcAttackSort.toString()]: (
    state: EntityState,
    action: ReturnType<typeof updateQcAttackSort>,
  ) => {
    debugger
    const { id, sorting } = action.payload
    state.qc_attacks[id].sorting = sorting
  },
})

export const [createQcAttack, updateQcAttack, destroyQcAttack] =
  createApiActions('qc_attack', 'qc')
