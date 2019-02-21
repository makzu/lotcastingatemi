import { getJSON } from 'redux-api-middleware'

import { callApi } from 'utils/api.js'
import {
  characterTraitTypes as entityTypes,
  crudAction,
  optimisticTypes,
  reducerUpdateAction,
  standardTypes,
  VERBS
} from './_lib'

type parentTypes = 'character' | 'qc' | 'battlegroup'

/** Creates an entity reducer 'slice' for the specified entity */
export const createTraitReducer = (
  entityType: entityTypes,
  parentType: parentTypes = 'character'
) => {
  const pluralType = entityType + 's'

  return {
    /* Create actions */
    [crudAction(entityType, 'CREATE').success.toString()]: (state, action) => {
      const { id } = action.payload
      const { charId } = action.meta
      const parent = (action.meta.parent || parentType) + 's'
      const assoc = traitAssoc(entityType, action.payload)
      const newTraitIds = state[parent][charId][assoc].concat([id])

      state[parent][charId][assoc] = [...new Set(newTraitIds)]
      state[pluralType][id] = action.payload
    },

    /* Update actions */
    /* redux-optimistic-ui has us updating the state on _START rather than _SUCCESS */
    [crudAction(entityType, 'UPDATE').start.toString()]: reducerUpdateAction(
      pluralType
    ),

    /* Destroy actions */
    [crudAction(entityType, 'DESTROY').start.toString()]: (state, action) => {
      const { charId, id } = action.meta
      const parent = (action.meta.parent || parentType) + 's'
      const assoc = traitAssoc(entityType, state[pluralType][id])

      state[parent][charId][assoc] = state[parent][charId][assoc].filter(
        (w: number) => w !== id
      )
      delete state[pluralType][id]
    },
  }
}

/** Creates a tuple of API actions for array destructuring assignment
 *  shaped like [create, update, destroy]
 */
export const createApiActions = (
  entityType: entityTypes,
  parentType: parentTypes = 'character'
): [CreateAction, UpdateAction, DestroyAction] => [
  createTraitCreateAction(entityType, parentType),
  createTraitUpdateAction(entityType, parentType),
  createTraitDestroyAction(entityType, parentType),
]

const justGetJSON = (_0: any, _1: any, response) => getJSON(response)

interface CreateActionOptions {
  type?: string
  parent?: parentTypes
}
type CreateAction = (charId: number, options?: CreateActionOptions) => void
/** Creates an API-Calling Action to create the specified entity */
const createTraitCreateAction = (
  entityType: entityTypes,
  parentType: parentTypes = 'character'
) => (charId: number, options: CreateActionOptions = {}): CreateAction => {
  const action = crudAction(entityType, 'CREATE')
  const parent = options.parent || parentType
  let createObj = {}
  if (options.type) {
    createObj = { [entityType]: { type: options.type } }
  }
  const metaObj: { [x: string]: string | number } = { charId }
  if (options.parent) {
    metaObj.parent = options.parent
  }

  return callApi({
    body: JSON.stringify(createObj),
    endpoint: `/api/v1/${parent}s/${charId}/${entityType}s`,
    types: standardTypes(entityType, action, justGetJSON, metaObj),
  })
}

type UpdateAction = (
  id: number,
  charId: number,
  trait: { [x: string]: any },
  parent?: parentTypes
) => void

let nextTransactionId = 0
/** Creates an API-Calling Action to update the specified entity */
const createTraitUpdateAction = (
  entityType: entityTypes,
  parentType: parentTypes = 'character'
) => (
  id: number,
  charId: number,
  trait: object,
  parent: parentTypes = parentType
): UpdateAction => {
  const transactionId = entityType + nextTransactionId++
  const action = crudAction(entityType, 'UPDATE')
  return callApi({
    body: JSON.stringify(trait),
    endpoint: `/api/v1/${parent}s/${charId}/${entityType}s/${id}`,
    method: VERBS.PATCH,
    types: optimisticTypes(
      entityType,
      action,
      id,
      transactionId,
      trait,
      justGetJSON,
      charId,
      parent
    ),
  })
}

type DestroyAction = (id: number, charId: number) => void
/** Creates an API-Calling Action to destroy the specified entity */
const createTraitDestroyAction = (
  entityType: entityTypes,
  parentType: parentTypes = 'character'
) => (
  id: number,
  charId: number,
  parent: parentTypes = parentType
): DestroyAction => {
  const transactionId = entityType + nextTransactionId++
  const action = crudAction(entityType, 'DESTROY')
  return callApi({
    endpoint: `/api/v1/${parent}s/${charId}/${entityType}s/${id}`,
    method: VERBS.DELETE,
    types: optimisticTypes(
      entityType,
      action,
      id,
      transactionId,
      null,
      null,
      charId,
      parent
    ),
  })
}

const traitAssoc = (type: string, payload: any) => {
  if (type !== 'charm') {
    return type + 's'
  }

  switch (payload.charm_type) {
    case 'MartialArts':
      return 'martial_arts_charms'
    case 'Spirit':
      return 'spirit_charms'
    case 'Evocation':
      return 'evocations'
    default:
      return 'charms'
  }
}
