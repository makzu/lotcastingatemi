// @flow
import { createApiActions, createTraitReducer } from './_trait'

export default createTraitReducer('merit')

export const [createMerit, updateMerit, destroyMerit] = createApiActions(
  'merit'
)
