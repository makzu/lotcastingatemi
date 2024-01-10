// @flow
import { createApiActions, createTraitReducer } from './_trait'

export default createTraitReducer('qc_attack', 'qc')

export const [createQcAttack, updateQcAttack, destroyQcAttack] =
  createApiActions('qc_attack', 'qc')
