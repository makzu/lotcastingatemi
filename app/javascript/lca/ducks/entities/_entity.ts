import * as deepmerge from 'deepmerge'
import { getJSON } from 'redux-api-middleware'

import { callApi } from 'utils/api'
import {
  characterTypes as entityTypes,
  crudAction,
  optimisticTypes,
  reducerUpdateAction,
  standardTypes
} from './_lib'

/* Overwrite arrays instead of concatenating them */
const arrayMerge = (_, sourceArray) => sourceArray

export const mergeEntity = (state, action): any =>
  deepmerge(state, action.payload.entities || {}, { arrayMerge })

export const createEntityReducer = (
  entityType: entityTypes,
  reducers: {} = {}
) => {
  const pluralType = entityType + 's'

  return {
    ...reducers,
    [crudAction(entityType, 'CREATE').success.toString()]: mergeEntity,
    [crudAction(entityType, 'DUPLICATE').success.toString()]: mergeEntity,
    [crudAction(entityType, 'FETCH').success.toString()]: mergeEntity,
    [crudAction(entityType, 'FETCH_ALL').success.toString()]: (
      state,
      action
    ) => {
      const myID = state.currentPlayer
      const newState = mergeEntity(state, action)
      newState.players[myID][pluralType] = [
        ...new Set(
          (state.players[myID][pluralType] || []).concat(action.payload.result)
        ),
      ]

      return newState
    },
    [crudAction(entityType, 'UPDATE').start.toString()]: reducerUpdateAction(
      pluralType
    ),
    [crudAction(entityType, 'DESTROY').start.toString()]: (state, action) => {
      const { id } = action.meta
      const myId = state.currentPlayer

      delete state[pluralType][id]
      state.players[myId][pluralType] = state.players[myId][pluralType].filter(
        i => i !== id
      )
    },
  }
}

/** Returns an array of API actions, in this shape:
 * [create, duplicate, fetch, fetch_all, update, destroy]
 */
export const createApiActions = (type: entityTypes) => [
  createCreateAction(type),
  createDuplicateAction(type),
  createFetchAction(type),
  createFetchAllAction(type),
  createUpdateAction(type),
  createDestroyAction(type),
]

export const createFetchAction = (type: entityTypes) => (id: number) => {
  const action = crudAction(type, 'FETCH')
  return callApi({
    endpoint: `/api/v1/${type}s/${id}`,
    method: 'GET',
    types: standardTypes(type, action),
  })
}

export const createFetchAllAction = (type: entityTypes) => () => {
  const action = crudAction(type, 'FETCH_ALL')
  return callApi({
    endpoint: `/api/v1/${type}s`,
    method: 'GET',
    types: standardTypes(`${type}List`, action),
  })
}

export const createCreateAction = (type: entityTypes) => (
  traits: object = {}
) => {
  const action = crudAction(type, 'CREATE')
  return callApi({
    body: JSON.stringify(traits),
    endpoint: `/api/v1/${type}s`,
    types: standardTypes(type, action),
  })
}

export const createDuplicateAction = (type: entityTypes) => (id: number) => {
  const action = crudAction(type, 'DUPLICATE')
  return callApi({
    endpoint: `/api/v1/${type}s/${id}/duplicate`,
    types: standardTypes(type, action),
  })
}

let nextTransactionId = 0
export const createUpdateAction = (type: entityTypes) => (
  id: number,
  trait: object
) => {
  const transactionId = type + nextTransactionId++
  const action = crudAction(type, 'UPDATE')
  return callApi({
    body: JSON.stringify({ [type]: trait }),
    endpoint: `/api/v1/${type}s/${id}`,
    method: 'PATCH',
    types: optimisticTypes(
      type,
      action,
      id,
      transactionId,
      trait,
      (_0: any, _1: any, res: object) => getJSON(res)
    ),
  })
}

export const createDestroyAction = (type: entityTypes) => (id: number) => {
  const transactionId = type + nextTransactionId++
  const action = crudAction(type, 'DESTROY')
  return callApi({
    endpoint: `/api/v1/${type}s/${id}`,
    method: 'DELETE',
    types: optimisticTypes(type, action, id, transactionId),
  })
}
