import { createApiActions, createTraitReducer } from './_trait'

export default createTraitReducer('poison')

export const [createPoison, updatePoison, destroyPoison] =
  createApiActions('poison')
