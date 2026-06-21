import type { RootState } from '@lca/store.ts'
import { callApi } from '@lca/utils/api.ts'
import { createUpdateAction, mergeEntity } from './_entity.ts'
import {
  crudAction,
  reducerUpdateAction,
  standardTypes,
  unwrapped,
} from './_lib.ts'
import { defaultState, type EntityState } from './index.ts'

const PLAYER = 'player'

/* *** Reducer *** */
export default {
  [crudAction(PLAYER, 'UPDATE').start.toString()]: reducerUpdateAction(
    `${PLAYER}s`,
  ),
  [crudAction(PLAYER, 'FETCH').success.toString()]: (
    state: EntityState,
    action,
  ) => {
    const newState = mergeEntity(state, action)

    newState.currentPlayer = action.payload.result

    return newState
  },
  [crudAction(PLAYER, 'DESTROY').success.toString()]: () => defaultState,
}

/* *** Actions *** */
const endpoint = '/api/v1/players'
export const updatePlayer = createUpdateAction(PLAYER)

export function fetchCurrentPlayer() {
  const action = crudAction(PLAYER, 'FETCH')
  return callApi({
    endpoint,
    method: 'GET',
    types: standardTypes(PLAYER, action),
  })
}

export function destroyAccount() {
  const action = crudAction(PLAYER, 'DESTROY')
  return callApi({
    endpoint,
    method: 'DELETE',
    types: standardTypes(PLAYER, action),
  })
}

export interface Player {
  id: number
  display_name: string
  characters: number[]
  qcs: number[]
  battlegroups: number[]
  chronicles: number[]
  own_chronicles: number[]
}

/* *** Selectors *** */
// tslint:disable object-literal-sort-keys
export const getSpecificPlayer = (state: RootState, id: number): Player => ({
  characters: [],
  qcs: [],
  battlegroups: [],
  chronicles: [],
  own_chronicles: [],
  ...unwrapped(state).players[id],
})

export const getCurrentPlayer = (state: RootState): Player =>
  getSpecificPlayer(state, state.session.id)
