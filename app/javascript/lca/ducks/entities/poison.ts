// @flow
import { createApiActions, createTraitReducer } from './_trait'

export default createTraitReducer('poison')

export const [creatPoison, updatePoison, destroyPoison] = createApiActions(
  'poison'
)
