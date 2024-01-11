import { createApiActions, createTraitReducer } from './_trait'

export default createTraitReducer('qc_merit', 'qc')

export const [createQcMerit, updateQcMerit, destroyQcMerit] = createApiActions(
  'qc_merit',
  'qc',
)
