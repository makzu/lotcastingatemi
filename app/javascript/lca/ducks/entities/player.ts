import { callApi } from 'utils/api'
import { defaultState, EntityState } from './'
import { createUpdateAction, mergeEntity } from './_entity'
import {
  crudAction,
  reducerUpdateAction,
  standardTypes,
  unwrapped,
} from './_lib'
import { Player } from 'types'
import { RootState } from 'store'

const PLAYER = 'player'

/* *** Reducer *** */
export default {
  [crudAction(PLAYER, 'UPDATE').start.toString()]: reducerUpdateAction(
    PLAYER + 's',
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

/* *** Selectors *** */
// tslint:disable object-literal-sort-keys
export const getSpecificPlayer = (state: RootState, id: number): Player =>
  unwrapped(state).players[id]

export const getCurrentPlayer = (state: RootState): Player =>
  getSpecificPlayer(state, state.session.id)
