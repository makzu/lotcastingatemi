import deepmerge from 'deepmerge'
import { getJSON, RSAAAction } from 'redux-api-middleware'

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
const arrayMerge = (_: null[], sourceArray: unknown[]) => sourceArray

export const mergeEntity = (state: EntityState, action) =>
  deepmerge(state, action.payload.entities || {}, { arrayMerge })

export const createEntityReducer = (
  entityType: eTypes,
  reducers: object = {},
) => {
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
export const createApiActions = (
  type: eTypes,
): [ACreate, AIdAction, AIdAction, AFetchAll, AUpdate, AIdAction] => [
  createCreateAction(type),
  createDuplicateAction(type),
  createFetchAction(type),
  createFetchAllAction(type),
  createUpdateAction(type),
  createDestroyAction(type),
]

type AIdAction = (id: number) => RSAAAction
export const createFetchAction =
  (type: eTypes): AIdAction =>
  (id) => {
    const action = crudAction(type, 'FETCH')
    return callApi({
      endpoint: `/api/v1/${type}s/${id}`,
      method: 'GET',
      types: standardTypes(type, action),
    })
  }

type AFetchAll = (page?: number) => RSAAAction
export const createFetchAllAction =
  (type: eTypes): AFetchAll =>
  (page = 1) => {
    const action = crudAction(type, 'FETCH_ALL')
    return callApi({
      endpoint: `/api/v1/${type}s?page=${page}`,
      method: 'GET',
      types: standardTypes(`${type}List`, action),
    })
  }

type ACreate = (traits: object) => RSAAAction
export const createCreateAction =
  (type: eTypes): ACreate =>
  (traits = {}) => {
    const action = crudAction(type, 'CREATE')
    return callApi({
      body: JSON.stringify(traits),
      endpoint: `/api/v1/${type}s`,
      types: standardTypes(type, action),
    })
  }

export const createDuplicateAction =
  (type: eTypes): AIdAction =>
  (id) => {
    const action = crudAction(type, 'DUPLICATE')
    return callApi({
      endpoint: `/api/v1/${type}s/${id}/duplicate`,
      types: standardTypes(type, action),
    })
  }

type AUpdate = (id: number, trait: object) => RSAAAction
let nextTransactionId = 0
export const createUpdateAction =
  (type: eTypes): AUpdate =>
  (id, trait) => {
    const transactionId = `${type}${nextTransactionId++}`
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

export const createDestroyAction =
  (type: eTypes): AIdAction =>
  (id) => {
    const transactionId = `${type}${nextTransactionId++}`
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
