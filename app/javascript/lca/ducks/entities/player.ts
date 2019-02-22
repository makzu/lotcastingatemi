// @flow
import { callApi } from 'utils/api'
import { defaultState } from './'
import { createUpdateAction, mergeEntity } from './_entity'
import { crudAction, reducerUpdateAction, standardTypes } from './_lib'

const PLAYER = 'player'
const endpoint = '/api/v1/players'

export default {
  [crudAction(PLAYER, 'UPDATE').start.toString()]: reducerUpdateAction(
    PLAYER + 's'
  ),
  [crudAction(PLAYER, 'FETCH').success.toString()]: (state, action) => {
    const newState = mergeEntity(state, action)

    newState.currentPlayer = action.payload.result

    return newState
  },
  [crudAction(PLAYER, 'DESTROY').success.toString()]: () => defaultState,
}

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
