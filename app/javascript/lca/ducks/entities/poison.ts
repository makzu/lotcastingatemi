import { createApiActions, createTraitReducer } from './_trait.ts'

export default createTraitReducer('poison')

export const [createPoison, updatePoison, destroyPoison] =
  createApiActions('poison')
