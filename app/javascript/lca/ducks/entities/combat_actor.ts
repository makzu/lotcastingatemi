import { createApiActions, createEntityReducer } from './_entity.ts'

export default createEntityReducer('combat_actor')

export const [
  createCombatActor,
  duplicateCombatActor,
  fetchCombatActor,
  fetchAllCombatActors,
  updateCombatActor,
  destroyCombatActor,
] = createApiActions('combat_actor')
