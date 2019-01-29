// @flow
import { createApiActions, createEntityReducer } from './_entity'

export default createEntityReducer('qc')

export const [
  createQc,
  duplicateQc,
  fetchQc,
  fetchAllQcs,
  updateQc,
  destroyQc,
] = createApiActions('qc')
