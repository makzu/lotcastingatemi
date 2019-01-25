// @flow
import { createApiActions, createTraitReducer } from './_trait'

export default createTraitReducer('spell')

export const [createSpell, updateSpell, destroySpell] = createApiActions(
  'spell'
)
