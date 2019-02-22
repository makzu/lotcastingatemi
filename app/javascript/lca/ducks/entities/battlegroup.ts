// @flow
import { callApi } from 'utils/api'
import { createApiActions, createEntityReducer, mergeEntity } from './_entity'
import { crudAction, standardTypes } from './_lib'

const BATTLEGROUP = 'battlegroup'

export default createEntityReducer('battlegroup', {
  [crudAction(BATTLEGROUP, 'CREATE_FROM_QC').success.toString()]: mergeEntity,
})

export const [
  createBattlegroup,
  duplicateBattlegroup,
  fetchBattlegroup,
  fetchAllBattlegroups,
  updateBattlegroup,
  destroyBattlegroup,
] = createApiActions(BATTLEGROUP)

export function createBattlegroupFromQc(id: number) {
  const action = crudAction(BATTLEGROUP, 'CREATE_FROM_QC')
  return callApi({
    endpoint: `/api/v1/battlegroups/create_from_qc/${id}`,
    types: standardTypes(BATTLEGROUP, action),
  })
}
