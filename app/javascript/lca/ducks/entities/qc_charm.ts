// @flow
import { createApiActions, createTraitReducer } from './_trait'

export default createTraitReducer('qc_charm', 'qc')

export const [createQcCharm, updateQcCharm, destroyQcCharm] = createApiActions(
  'qc_charm',
  'qc',
)
