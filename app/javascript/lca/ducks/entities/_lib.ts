import { Action } from 'redux'
import { PayloadAction } from 'redux-starter-kit'

interface PayloadMetaAction<P = any, M = any, T extends string = string>
  extends PayloadAction<T> {
  meta: M
}
interface PayloadMetaActionCreator<
  P = any,
  M = any,
  T extends string = string
> {
  (): Action<T>
  (payload: P, meta: M): PayloadMetaAction<P, M, T>
  (payload: P): PayloadAction<P, T>
}

export function createActionWithMeta<
  P = any,
  M = any,
  T extends string = string
>(type: T): PayloadMetaActionCreator<P> {
  function actionCreator(): Action<T>
  function actionCreator(payload: P): PayloadAction<P, T>
  function actionCreator(payload: P, meta: M): PayloadMetaAction<P, M, T>
  function actionCreator(
    payload?: P,
    meta?: M
  ): Action<T> | PayloadAction<P, T> | PayloadMetaAction<P, M, T> {
    return { type, payload, meta }
  }

  actionCreator.toString = () => `${type}`

  return actionCreator
}

export type characterTraitTypes =
  | 'charm'
  | 'merit'
  | 'poison'
  | 'spell'
  | 'weapon'
  | 'qc_attack'
  | 'qc_charm'
  | 'qc_merit'
type entityTypes = characterTraitTypes
type crudActions = 'CREATE' | 'DESTROY' | 'FETCH' | 'UPDATE'

// tslint:disable object-literal-sort-keys
export const crudAction = (type: entityTypes, action: crudActions) => ({
  start: createActionWithMeta(`lca/${type}/${action}_START`),
  success: createActionWithMeta(`lca/${type}/${action}_SUCCESS`),
  failure: createActionWithMeta(`lca/${type}/${action}_FAILURE`),
})
