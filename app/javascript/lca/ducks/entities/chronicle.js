// @flow
import { merge } from 'lodash'
import { normalize } from 'normalizr'
import { getJSON } from 'redux-api-middleware'
import { BEGIN, COMMIT, REVERT } from 'redux-optimistic-ui'

import { mergeStateWithNormalizedEntities, type EntityState } from '.'
import * as schemas from './_schemas.js'
import {
  CHA_CREATE_SUCCESS,
  CHA_DUPE_SUCCESS,
  CHA_FETCH_SUCCESS,
  CHA_FETCH_ALL_SUCCESS,
} from './character.js'
import {
  QC_CREATE_SUCCESS,
  QC_DUPE_SUCCESS,
  QC_FETCH_SUCCESS,
  QC_FETCH_ALL_SUCCESS,
} from './qc.js'
import {
  BG_CREATE_SUCCESS,
  BG_DUPE_SUCCESS,
  BG_CREATE_FROM_QC_SUCCESS,
  BG_FETCH_ALL_SUCCESS,
} from './battlegroup.js'
import { callApi } from 'utils/api.js'

export const CHN_FETCH = 'lca/chronicle/FETCH'
export const CHN_FETCH_SUCCESS = 'lca/chronicle/FETCH_SUCCESS'
export const CHN_FETCH_FAILURE = 'lca/chronicle/FETCH_FAILURE'
export const CHN_CREATE = 'lca/chronicle/CREATE'
export const CHN_CREATE_SUCCESS = 'lca/chronicle/CREATE_SUCCESS'
export const CHN_CREATE_FAILURE = 'lca/chronicle/CREATE_FAILURE'
export const CHN_UPDATE = 'lca/chronicle/UPDATE'
export const CHN_UPDATE_SUCCESS = 'lca/chronicle/UPDATE_SUCCESS'
export const CHN_UPDATE_FAILURE = 'lca/chronicle/UPDATE_FAILURE'
export const CHN_DESTROY = 'lca/chronicle/DESTROY'
export const CHN_DESTROY_SUCCESS = 'lca/chronicle/DESTROY_SUCCESS'
export const CHN_DESTROY_FAILURE = 'lca/chronicle/DESTROY_FAILURE'
export const CHN_JOIN = 'lca/chronicle/JOIN'
export const CHN_JOIN_SUCCESS = 'lca/chronicle/JOIN_SUCCESS'
export const CHN_JOIN_FAILURE = 'lca/chronicle/JOIN_FAILURE'
export const INVITE_CODE_UPDATE = 'lca/chronicle/INVITE_CODE_UPDATE'
export const INVITE_CODE_UPDATE_SUCCESS =
  'lca/chronicle/INVITE_CODE_UPDATE_SUCCESS'
export const INVITE_CODE_UPDATE_FAILURE =
  'lca/chronicle/INVITE_CODE_UPDATE_FAILURE'
export const CHN_REMOVE_PLAYER = 'lca/chronicle/REMOVE_PLAYER'
export const CHN_REMOVE_PLAYER_SUCCESS = 'lca/chronicle/REMOVE_PLAYER_SUCCESS'
export const CHN_REMOVE_PLAYER_FAILURE = 'lca/chronicle/REMOVE_PLAYER_FAILURE'
export const CHN_ADD_THING = 'lca/chronicle/ADD_THING'
export const CHN_ADD_THING_SUCCESS = 'lca/chronicle/ADD_THING_SUCCESS'
export const CHN_ADD_THING_FAILURE = 'lca/chronicle/ADD_THING_FAILURE'
export const CHN_REMOVE_THING = 'lca/chronicle/REMOVE_THING'
export const CHN_REMOVE_THING_SUCCESS = 'lca/chronicle/REMOVE_THING_SUCCESS'
export const CHN_REMOVE_THING_FAILURE = 'lca/chronicle/REMOVE_THING_FAILURE'

export default function reducer(state: EntityState, action: Object) {
  let _id
  let _trait
  let _entities
  _entities = action.payload != undefined ? action.payload.entities : undefined

  switch (action.type) {
    case CHN_CREATE_SUCCESS:
      _entities = action.payload.entities
      return {
        ...state,
        players: {
          ...state.players,
          [_entities.chronicles[action.payload.result].st]: {
            ...state.players[_entities.chronicles[action.payload.result].st],
            own_chronicles: [
              ...state.players[_entities.chronicles[action.payload.result].st]
                .own_chronicles,
              action.payload.result,
            ],
          },
        },
        chronicles: merge({ ...state.chronicles }, _entities.chronicles),
      }

    case CHN_JOIN_SUCCESS:
    case CHN_FETCH_SUCCESS:
    case INVITE_CODE_UPDATE_SUCCESS:
    case CHN_ADD_THING_SUCCESS:
    case CHA_CREATE_SUCCESS:
    case CHA_DUPE_SUCCESS:
    case CHA_FETCH_SUCCESS:
    case CHA_FETCH_ALL_SUCCESS:
    case QC_CREATE_SUCCESS:
    case QC_DUPE_SUCCESS:
    case QC_FETCH_SUCCESS:
    case QC_FETCH_ALL_SUCCESS:
    case BG_CREATE_SUCCESS:
    case BG_CREATE_FROM_QC_SUCCESS:
    case BG_DUPE_SUCCESS:
    case BG_FETCH_ALL_SUCCESS:
      _entities = action.payload.entities
      return mergeStateWithNormalizedEntities(state, _entities)
    case CHN_REMOVE_PLAYER_SUCCESS:
      _entities = action.payload.entities
      return {
        ...state,
        players: { ...state.players, ..._entities.players },
        characters: { ...state.characters, ..._entities.characters },
        merits: { ...state.merits, ..._entities.merits },
        weapons: { ...state.weapons, ..._entities.weapons },
        charms: { ...state.charms, ..._entities.charms },
        spells: { ...state.spells, ..._entities.spells },
        qcs: { ...state.qcs, ..._entities.qcs },
        qc_merits: { ...state.qc_merits, ..._entities.qcMerits },
        qc_charms: { ...state.qc_charms, ..._entities.qcCharms },
        qc_attacks: { ...state.qc_attacks, ..._entities.qcAttacks },
        battlegroups: { ...state.battlegroups, ..._entities.battlegroups },
        chronicles: { ...state.chronicles, ..._entities.chronicles },
      }

    case CHN_UPDATE:
      _id = action.payload.id
      _trait = action.meta.trait
      return {
        ...state,
        chronicles: {
          ...state.chronicles,
          [_id]: {
            ...state.chronicles[_id],
            [_trait]: action.payload[_trait],
          },
        },
      }

    default:
      return state
  }
}

export function createChronicle(chron: Object) {
  return callApi({
    endpoint: '/api/v1/chronicles',
    method: 'POST',
    body: JSON.stringify({ chronicle: chron }),
    types: [
      CHN_CREATE,
      {
        type: CHN_CREATE_SUCCESS,
        payload: (action, state, res) => {
          return getJSON(res).then(json => normalize(json, schemas.chronicles))
        },
      },
      CHN_CREATE_FAILURE,
    ],
  })
}

export function fetchAllChronicles() {
  return callApi({
    endpoint: '/api/v1/chronicles',
    method: 'GET',
    types: [
      CHN_FETCH,
      {
        type: CHN_FETCH_SUCCESS,
        payload: (action, state, res) => {
          return getJSON(res).then(json =>
            normalize(json, schemas.chronicleList)
          )
        },
      },
      CHN_FETCH_FAILURE,
    ],
  })
}

export function fetchChronicle(id: number) {
  return callApi({
    endpoint: `/api/v1/chronicles/${id}`,
    method: 'GET',
    types: [
      CHN_FETCH,
      {
        type: CHN_FETCH_SUCCESS,
        payload: (action, state, res) => {
          return getJSON(res).then(json => normalize(json, schemas.chronicles))
        },
      },
      CHN_FETCH_FAILURE,
    ],
  })
}

let nextTransactionId = 0
export function updateChronicle(id: number, trait: string, value: string) {
  let transactionId = 'chronicle' + nextTransactionId++
  let chronicle = { [trait]: value }
  return callApi({
    endpoint: `/api/v1/chronicles/${id}`,
    method: 'PATCH',
    body: JSON.stringify({ chronicle: chronicle }),
    types: [
      {
        type: CHN_UPDATE,
        meta: { id: id, optimistic: { type: BEGIN, id: transactionId } },
        payload: chronicle,
      },
      {
        type: CHN_UPDATE_SUCCESS,
        meta: {
          id: id,
          traits: chronicle,
          optimistic: { type: COMMIT, id: transactionId },
        },
      },
      {
        type: CHN_UPDATE_FAILURE,
        meta: { id: id, optimistic: { type: REVERT, id: transactionId } },
      },
    ],
  })
}

export function joinChronicle(code: string) {
  return callApi({
    endpoint: '/api/v1/chronicles/join',
    method: 'POST',
    body: JSON.stringify({ invite_code: code }),
    types: [
      CHN_JOIN,
      {
        type: CHN_JOIN_SUCCESS,
        payload: (action, state, res) => {
          return getJSON(res).then(json => normalize(json, schemas.chronicles))
        },
      },
      CHN_JOIN_FAILURE,
    ],
  })
}

export function regenChronicleInviteCode(id: number) {
  return callApi({
    endpoint: `/api/v1/chronicles/${id}/regen_invite_code`,
    method: 'POST',
    types: [
      INVITE_CODE_UPDATE,
      {
        type: INVITE_CODE_UPDATE_SUCCESS,
        payload: (action, state, res) => {
          return getJSON(res).then(json => normalize(json, schemas.chronicles))
        },
      },
      INVITE_CODE_UPDATE_FAILURE,
    ],
  })
}

// TODO: Flush the store of the removed player's data
export function removePlayerFromChronicle(id: number, playerId: number) {
  return callApi({
    endpoint: `/api/v1/chronicles/${id}/remove_player/${playerId}`,
    method: 'POST',
    types: [
      CHN_REMOVE_PLAYER,
      {
        type: CHN_REMOVE_PLAYER_SUCCESS,
        payload: (action, state, res) => {
          return getJSON(res).then(json => normalize(json, schemas.chronicles))
        },
      },
      CHN_REMOVE_PLAYER_FAILURE,
    ],
  })
}

export function addThingToChronicle(
  id: number,
  thingId: number,
  thingType: string
) {
  return callApi({
    endpoint: `/api/v1/chronicles/${id}/add_${thingType}/${thingId}`,
    method: 'POST',
    types: [
      CHN_ADD_THING,
      {
        type: CHN_ADD_THING_SUCCESS,
        payload: (action, state, res) => {
          return getJSON(res).then(json => normalize(json, schemas.chronicles))
        },
      },
      CHN_ADD_THING_FAILURE,
    ],
  })
}

export function removeThingFromChronicle(
  chronId: number,
  id: number,
  type: string
) {
  return callApi({
    endpoint: `/api/v1/chronicles/${chronId}/remove_${type}/${id}`,
    method: 'POST',
    types: [
      CHN_REMOVE_THING,
      {
        type: CHN_REMOVE_THING_SUCCESS,
        meta: { id: chronId, thingId: id, type: type },
        payload: (action, state, res) => {
          return getJSON(res).then(json => normalize(json, schemas.chronicles))
        },
      },
      CHN_REMOVE_THING_FAILURE,
    ],
  })
}

export function destroyChronicle(id: number) {
  return callApi({
    endpoint: `/api/v1/chronicles/${id}`,
    method: 'DELETE',
    types: [
      CHN_DESTROY,
      { type: CHN_DESTROY_SUCCESS, meta: { id: id } },
      CHN_DESTROY_FAILURE,
    ],
  })
}
