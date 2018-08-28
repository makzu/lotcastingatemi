// @flow
import { normalize } from 'normalizr'
import { getJSON } from 'redux-api-middleware'
import { BEGIN, COMMIT, REVERT } from 'redux-optimistic-ui'
import * as schemas from './_schemas.js'
import { callApi } from 'utils/api.js'
import type { EntityState } from './'

const QC_CREATE = 'lca/qc/CREATE'
export const QC_CREATE_SUCCESS = 'lca/qc/CREATE_SUCCESS'
const QC_CREATE_FAILURE = 'lca/qc/CREATE_FAILURE'
const QC_FETCH = 'lca/qc/FETCH'
export const QC_FETCH_SUCCESS = 'lca/qc/FETCH_SUCCESS'
const QC_FETCH_FAILURE = 'lca/qc/FETCH_FAILURE'
const QC_UPDATE = 'lca/qc/UPDATE'
const QC_UPDATE_SUCCESS = 'lca/qc/UPDATE_SUCCESS'
const QC_UPDATE_FAILURE = 'lca/qc/UPDATE_FAILURE'
const QC_DESTROY = 'lca/qc/DESTROY'
const QC_DESTROY_SUCCESS = 'lca/qc/DESTROY_SUCCESS'
const QC_DESTROY_FAILURE = 'lca/qc/DESTROY_FAILURE'

export default (state: EntityState, action: Object) => {
  // Optimistic update
  if (action.type === QC_UPDATE) {
    return {
      ...state,
      qcs: {
        ...state.qcs,
        [action.meta.id]: {
          ...state.qcs[action.meta.id],
          ...action.payload,
        },
      },
    }
  }

  return state
}

export function createQc(qc: Object) {
  return callApi({
    endpoint: '/api/v1/qcs',
    method: 'POST',
    body: JSON.stringify({ qc: qc }),
    types: [QC_CREATE, QC_CREATE_SUCCESS, QC_CREATE_FAILURE],
  })
}

export function fetchQc(id: number) {
  return callApi({
    endpoint: `/api/v1/qcs/${id}`,
    method: 'GET',
    types: [
      QC_FETCH,
      {
        type: QC_FETCH_SUCCESS,
        payload: (action, state, res) => {
          return getJSON(res).then(json => normalize(json, schemas.qcs))
        },
      },
      QC_FETCH_FAILURE,
    ],
  })
}

export function updateQc(
  id: number,
  trait: string,
  value: string | number | Object | Array<Object> | Array<string>
) {
  return updateQcMulti(id, { [trait]: value })
}

let nextTransactionId = 0
export function updateQcMulti(id: number, qc: Object) {
  let transactionId = 'qc' + nextTransactionId++
  return callApi({
    endpoint: `/api/v1/qcs/${id}`,
    method: 'PATCH',
    body: JSON.stringify({ qc: qc }),
    types: [
      {
        type: QC_UPDATE,
        meta: { id: id, optimistic: { type: BEGIN, id: transactionId } },
        payload: qc,
      },
      {
        type: QC_UPDATE_SUCCESS,
        meta: {
          id: id,
          traits: qc,
          optimistic: { type: COMMIT, id: transactionId },
        },
      },
      {
        type: QC_UPDATE_FAILURE,
        meta: { id: id, optimistic: { type: REVERT, id: transactionId } },
      },
    ],
  })
}

export function destroyQc(id: number) {
  return callApi({
    endpoint: `/api/v1/qcs/${id}`,
    method: 'DELETE',
    types: [QC_DESTROY, QC_DESTROY_SUCCESS, QC_DESTROY_FAILURE],
  })
}
