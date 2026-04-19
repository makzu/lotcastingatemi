import deepmerge from 'deepmerge'
import { AnyAction } from 'redux'
import { getJSON } from 'redux-api-middleware'

import { callApi } from 'utils/api'
import {
  characterTypes as eTypes,
  crudAction,
  optimisticTypes,
  reducerUpdateAction,
  standardTypes,
  unwrapped,
} from './_lib'
import { EntityState } from './_types'

/* Overwrite arrays instead of concatenating them */
const arrayMerge: deepmerge.Options['arrayMerge'] = (_, sourceArray) =>
  sourceArray

export const mergeEntity = (state: EntityState, action: AnyAction) =>
  deepmerge(state, action.payload.entities || {}, { arrayMerge })

export const createEntityReducer = (entityType: eTypes, reducers) => {
  const pluralType = entityType + 's'

  return {
    ...reducers,
    [crudAction(entityType, 'CREATE').success.toString()]: mergeEntity,
    [crudAction(entityType, 'DUPLICATE').success.toString()]: mergeEntity,
    [crudAction(entityType, 'FETCH').success.toString()]: mergeEntity,
    [crudAction(entityType, 'FETCH_ALL').success.toString()]: (
      state: EntityState,
      action,
    ) => {
      const myID = state.currentPlayer
      const newState = mergeEntity(state, action)
      newState.players[myID][pluralType] = [
        ...new Set(
          (state.players[myID][pluralType] || []).concat(action.payload.result),
        ),
      ]

      return newState
    },
    [crudAction(entityType, 'UPDATE').start.toString()]:
      reducerUpdateAction(pluralType),
    [crudAction(entityType, 'DESTROY').start.toString()]: (
      state: EntityState,
      action,
    ) => {
      const { id } = action.meta
      const myId = state.currentPlayer

      delete state[pluralType][id]
      state.players[myId][pluralType] = state.players[myId][pluralType].filter(
        (i: number) => i !== id,
      )
    },
  }
}

/** Returns an array of API actions, in this shape:
 * [create, duplicate, fetch, fetch_all, update, destroy]
 */
export const createApiActions = (type: eTypes) =>
  [
    createCreateAction(type),
    createDuplicateAction(type),
    createFetchAction(type),
    createFetchAllAction(type),
    createUpdateAction(type),
    createDestroyAction(type),
  ] as const

export const createFetchAction = (type: eTypes) => (id: number) => {
  const action = crudAction(type, 'FETCH')
  return callApi({
    endpoint: `/api/v1/${type}s/${id}`,
    method: 'GET',
    types: standardTypes(type, action),
  })
}

export const createFetchAllAction =
  (type: eTypes) =>
  (page = 1) => {
    const action = crudAction(type, 'FETCH_ALL')
    return callApi({
      endpoint: `/api/v1/${type}s?page=${page}`,
      method: 'GET',
      types: standardTypes(`${type}List`, action),
    })
  }

export const createCreateAction =
  (type: eTypes) =>
  (traits = {}) => {
    const action = crudAction(type, 'CREATE')
    return callApi({
      method: 'POST',
      body: JSON.stringify(traits),
      endpoint: `/api/v1/${type}s`,
      types: standardTypes(type, action),
    })
  }

export const createDuplicateAction = (type: eTypes) => (id: number) => {
  const action = crudAction(type, 'DUPLICATE')
  return callApi({
    method: 'POST',
    endpoint: `/api/v1/${type}s/${id}/duplicate`,
    types: standardTypes(type, action),
  })
}

let nextTransactionId = 0
export const createUpdateAction =
  (type: eTypes) => (id: number, trait: any) => {
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
        (_0: null, _1: null, res: Response) => getJSON(res),
      ),
    })
  }

export const createDestroyAction = (type: eTypes) => (id) => {
  const transactionId = type + nextTransactionId++
  const action = crudAction(type, 'DESTROY')
  return callApi({
    endpoint: `/api/v1/${type}s/${id}`,
    method: 'DELETE',
    types: optimisticTypes(type, action, id, transactionId),
  })
}

export const createConditionalFetchAction =
  (type: eTypes, fetchAction) => (id) => (dispatch, getState) => {
    const state = getState()
    const pluralType = type + 's'

    if (unwrapped(state)[pluralType][id] == null) {
      dispatch(fetchAction(id))
    }
  }
