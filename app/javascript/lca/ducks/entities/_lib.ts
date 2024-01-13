import { normalize } from 'normalizr'
import { Action } from 'redux'
import { ActionFunctionAny, createAction } from 'redux-actions'
import { getJSON } from 'redux-api-middleware'
import { BEGIN, COMMIT, REVERT } from 'redux-optimistic-ui'

import { RootState } from 'store'
import * as schemas from './_schemas'
import { EntityState } from './_types'

export type characterTraitTypes =
  | 'charm'
  | 'merit'
  | 'poison'
  | 'spell'
  | 'weapon'
  | 'qc_attack'
  | 'qc_charm'
  | 'qc_merit'

export type characterTypes =
  | 'character'
  | 'qc'
  | 'battlegroup'
  | 'combat_actor'
  | 'chronicle'
  | 'player'

export type listTypes = 'characterList' | 'qcList' | 'battlegroupList'

export type entityTypes = characterTraitTypes | characterTypes
type crudActions =
  | 'CREATE'
  | 'DUPLICATE'
  | 'FETCH'
  | 'FETCH_ALL'
  | 'UPDATE'
  | 'DESTROY'
  | 'CHANGE_TYPE'
  | 'CREATE_FROM_QC'
  | 'JOIN'
  | 'REMOVE_PLAYER'
  | 'REGEN_CODE'
  | 'ADD_THING'
  | 'REMOVE_THING'

export const API = 'lca-api'

export const START = 'START'
export const SUCCESS = 'SUCCESS'
export const FAILURE = 'FAILURE'

export interface CrudActionGroup {
  start: ActionFunctionAny<Action>
  success: ActionFunctionAny<Action>
  failure: ActionFunctionAny<Action>
}

export const massagePayload =
  (type: entityTypes | listTypes | string) => (_a: unknown, _b: unknown, res) =>
    getJSON(res.clone()).then((json) => normalize(json, schemas[type]))

export const successMeta = (_: null, __: null, { headers }: Response) => ({
  page: headers.get('current-page'),
  lastPage: headers.get('total-pages'),
})

type TypesTuple = [Action, Action, Action]

/** Shorthand for a standardized 'types' array for redux-api-middleware actions */
export const standardTypes = (
  type: entityTypes | listTypes,
  action: CrudActionGroup,
  payloadFunc = massagePayload(type),
  metaFunc = successMeta,
): TypesTuple => [
  action.start(null, metaFunc),
  action.success(payloadFunc, metaFunc),
  action.failure(),
]

export const optimisticTypes = (
  type: entityTypes,
  action: CrudActionGroup,
  id: number,
  transactionId: string,
  trait?: $TSFixMe,
  successPayload?: $TSFixMe,
  charId?: number,
  parent?: characterTypes,
): TypesTuple => [
  action.start(trait, {
    charId,
    id,
    optimistic: { id: transactionId, type: BEGIN },
    parent,
  }),
  action.success(successPayload, {
    charId,
    id,
    optimistic: { id: transactionId, type: COMMIT },
    parent,
  }),
  action.failure(null, {
    charId,
    id,
    optimistic: { id: transactionId, type: REVERT },
    parent,
  }),
]

const meta = (_: unknown, m: unknown) => m

export const crudAction = (
  type: entityTypes,
  action: crudActions,
): CrudActionGroup => ({
  start: createAction(`${API}/${type}/${action}/${START}`, null, meta),
  success: createAction(`${API}/${type}/${action}/${SUCCESS}`, null, meta),
  failure: createAction(`${API}/${type}/${action}/${FAILURE}`, null, meta),
})

export const reducerUpdateAction =
  (type: string) => (state: EntityState, action) => {
    const { id } = action.meta

    for (const key in action.payload) {
      if (action.payload.hasOwnProperty(key)) {
        state[type][id][key] = action.payload[key]
      }
    }
  }

/** Simply unwraps the entity portion of the state */
export const unwrapped = (state: RootState): EntityState =>
  state.entities.current
