// @flow
import { createReducer } from 'redux-starter-kit'

import { callApi } from 'utils/api.js'
import {
  createFetchAllAction,
  createUpdateAction,
  mergeEntity,
} from './_entity'
import { crudAction, reducerUpdateAction, standardTypes, VERBS } from './_lib'

const PLAYER = 'player'
const endpoint = '/api/v1/players'

export default createReducer(undefined, {
  [crudAction(PLAYER, 'UPDATE').start.toString()]: reducerUpdateAction(
    PLAYER + 's'
  ),
  [crudAction(PLAYER, 'FETCH').success.toString()]: mergeEntity,
})

export const updatePlayer = createUpdateAction(PLAYER)

export function fetchCurrentPlayer() {
  const action = crudAction(PLAYER, 'FETCH')
  return callApi({
    endpoint,
    method: VERBS.GET,
    types: standardTypes(PLAYER, action),
  })
}

export function destroyAccount() {
  const action = crudAction(PLAYER, 'DESTROY')
  return callApi({
    endpoint,
    method: VERBS.DELETE,
    types: standardTypes(PLAYER, action),
  })
}
