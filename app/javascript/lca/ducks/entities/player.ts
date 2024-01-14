import type { RootState } from 'store'
import { callApi } from '@/utils/api'
import { defaultState, type EntityState } from './'
import { createUpdateAction, mergeEntity } from './_entity'
import {
  crudAction,
  reducerUpdateAction,
  standardTypes,
  unwrapped,
} from './_lib'

const PLAYER = 'player'

/* *** Reducer *** */
export default {
  [crudAction(PLAYER, 'UPDATE').start.toString()]: reducerUpdateAction(
    PLAYER + 's',
  ),
  [crudAction(PLAYER, 'FETCH').success.toString()]: (
    state: EntityState,
    // @ts-expect-error FIXME reducer rewrite
    action,
  ) => {
    // FIXME
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const newState = mergeEntity(state, action)

    // FIXME
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
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

/* *** Selectors *** */
export const getSpecificPlayer = (state: RootState, id: number) =>
  unwrapped(state).players[id]

export const getCurrentPlayer = (state: RootState) =>
  getSpecificPlayer(state, state.session.id)
