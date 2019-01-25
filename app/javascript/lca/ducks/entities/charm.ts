// @flow
import { createApiActions, createTraitReducer } from './_trait'

export default createTraitReducer('charm')

export const [createCharm, updateCharm, destroyCharm] = createApiActions(
  'charm'
)
