// @flow
import { normalize } from 'normalizr'
import { getJSON } from 'redux-api-middleware'
import { BEGIN, COMMIT, REVERT } from 'redux-optimistic-ui'
import * as schemas from './_schemas.js'
import { callApi } from 'utils/api.js'
import type { EntityState } from './'

const FETCH = 'lca/battlegroup/FETCH'
const FETCH_SUCCESS = 'lca/battlegroup/FETCH_SUCCESS'
export const BG_FETCH_ALL_SUCCESS = 'lca/battlegroup/FETCH_ALL_SUCCESS'
const FETCH_FAILURE = 'lca/battlegroup/FETCH_FAILURE'
export const BG_CREATE = 'lca/battlegroup/CREATE'
export const BG_CREATE_SUCCESS = 'lca/battlegroup/CREATE_SUCCESS'
export const BG_CREATE_FAILURE = 'lca/battlegroup/CREATE_FAILURE'
export const BG_CREATE_FROM_QC = 'lca/battlegroup/CREATE_FROM_QC'
export const BG_CREATE_FROM_QC_SUCCESS =
  'lca/battlegroup/CREATE_FROM_QC_SUCCESS'
export const BG_CREATE_FROM_QC_FAILURE =
  'lca/battlegroup/CREATE_FROM_QC_FAILURE'
export const BG_DUPE = 'lca/battlegroup/DUPE'
export const BG_DUPE_SUCCESS = 'lca/battlegroup/DUPE_SUCCESS'
export const BG_DUPE_FAILURE = 'lca/battlegroup/DUPE_FAILURE'
const UPDATE = 'lca/battlegroup/UPDATE'
const UPDATE_SUCCESS = 'lca/battlegroup/UPDATE_SUCCESS'
const UPDATE_FAILURE = 'lca/battlegroup/UPDATE_FAILURE'
const DESTROY = 'lca/battlegroup/DESTROY'
const DESTROY_SUCCESS = 'lca/battlegroup/DESTROY_SUCCESS'
const DESTROY_FAILURE = 'lca/battlegroup/DESTROY_FAILURE'

export default (state: EntityState, action: Object) => {
  // Optimistic update
  if (action.type === UPDATE) {
    return {
      ...state,
      battlegroups: {
        ...state.battlegroups,
        [action.meta.id]: {
          ...state.battlegroups[action.meta.id],
          ...action.payload,
        },
      },
    }
  }
  if (action.type === BG_FETCH_ALL_SUCCESS) {
    return {
      ...state,
      players: {
        ...state.players,
        [state.currentPlayer]: {
          ...state.players[state.currentPlayer],
          battlegroups: [
            ...new Set(
              (state.players[state.currentPlayer].battlegroups || []).concat(
                action.payload.result
              )
            ),
          ],
        },
      },
    }
  }

  return state
}

const massageBattlegroupPayload = (action, state, res) =>
  getJSON(res).then(json => normalize(json, schemas.battlegroups))

export function fetchAllBattlegroups() {
  return callApi({
    endpoint: '/api/v1/battlegroups/',
    method: 'GET',
    types: [
      FETCH,
      {
        type: BG_FETCH_ALL_SUCCESS,
        payload: (action, state, res) => {
          return getJSON(res).then(json =>
            normalize(json, schemas.battlegroupList)
          )
        },
      },
      FETCH_FAILURE,
    ],
  })
}

export function createBattlegroup(bg: Object) {
  return callApi({
    endpoint: `/api/v1/battlegroups`,
    method: 'POST',
    body: JSON.stringify({ battlegroup: bg }),
    types: [
      BG_CREATE,
      { type: BG_CREATE_SUCCESS, payload: massageBattlegroupPayload },
      BG_CREATE_FAILURE,
    ],
  })
}

export function createBattlegroupFromQc(id: number) {
  return callApi({
    endpoint: `/api/v1/battlegroups/create_from_qc/${id}`,
    method: 'POST',
    types: [
      BG_CREATE_FROM_QC,
      { type: BG_CREATE_FROM_QC_SUCCESS, payload: massageBattlegroupPayload },
      BG_CREATE_FROM_QC_FAILURE,
    ],
  })
}

export function duplicateBattlegroup(id: number) {
  return callApi({
    endpoint: `/api/v1/battlegroups/${id}/duplicate`,
    method: 'POST',
    types: [
      BG_DUPE,
      { type: BG_DUPE_SUCCESS, payload: massageBattlegroupPayload },
      BG_DUPE_FAILURE,
    ],
  })
}

export function fetchBattlegroup(id: number) {
  return callApi({
    endpoint: `/api/v1/battlegroups/${id}`,
    method: 'GET',
    types: [
      FETCH,
      { type: FETCH_SUCCESS, payload: massageBattlegroupPayload },
      FETCH_FAILURE,
    ],
  })
}

export function updateBattlegroup(id: number, trait: string, value: string) {
  return updateBattlegroupMulti(id, { [trait]: value })
}

let nextTransactionId = 0
export function updateBattlegroupMulti(id: number, battlegroup: Object) {
  let transactionId = 'battlegroup' + nextTransactionId++
  return callApi({
    endpoint: `/api/v1/battlegroups/${id}`,
    method: 'PATCH',
    body: JSON.stringify({ battlegroup: battlegroup }),
    types: [
      {
        type: UPDATE,
        meta: { id: id, optimistic: { type: BEGIN, id: transactionId } },
        payload: battlegroup,
      },
      {
        type: UPDATE_SUCCESS,
        meta: {
          id: id,
          traits: battlegroup,
          optimistic: { type: COMMIT, id: transactionId },
        },
      },
      {
        type: UPDATE_FAILURE,
        meta: { id: id, optimistic: { type: REVERT, id: transactionId } },
      },
    ],
  })
}

export function destroyBattlegroup(id: number) {
  return callApi({
    endpoint: `/api/v1/battlegroups/${id}`,
    method: 'DELETE',
    types: [
      DESTROY,
      { type: DESTROY_SUCCESS, meta: { id: id } },
      DESTROY_FAILURE,
    ],
  })
}
