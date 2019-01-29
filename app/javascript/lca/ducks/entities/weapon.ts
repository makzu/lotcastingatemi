// @flow
import { createApiActions, createTraitReducer } from './_trait'

export default createTraitReducer('weapon')

export const [createWeapon, updateWeapon, destroyWeapon] = createApiActions(
  'weapon'
)
