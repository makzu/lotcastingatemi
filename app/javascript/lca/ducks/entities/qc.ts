// @flow
import { State } from 'ducks'
import { createApiActions, createEntityReducer } from './_entity'
import { unwrapped } from './_lib'

/* *** Reducer *** */
export default createEntityReducer('qc')

/* *** Actions *** */
export const [
  createQc,
  duplicateQc,
  fetchQc,
  fetchAllQcs,
  updateQc,
  destroyQc,
] = createApiActions('qc')

/* *** Selectors *** */
export const getSpecificQc = (state: State, id: number) =>
  unwrapped(state).qcs[id]
