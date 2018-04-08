import { merge } from 'lodash'
import { normalize } from 'normalizr'
import { getJSON } from 'redux-api-middleware'

import { mergeStateWithNormalizedEntities } from '.'
import * as schemas from './_schemas.js'
import { callApi } from '../../utils/api.js'

export const FETCH =         'lca/player/FETCH'
export const FETCH_SUCCESS = 'lca/player/FETCH_SUCCESS'
export const FETCH_FAILURE = 'lca/player/FETCH_FAILURE'
export const PLY_UPDATE =          'lca/player/UPDATE'
export const PLY_UPDATE_SUCCESS =  'lca/player/UPDATE_SUCCESS'
export const PLY_UPDATE_FAILURE =  'lca/player/UPDATE_FAILURE'

export default function reducer(state, action) {
  const _id = action.payload != undefined ? action.payload.id : null
  const _trait = action.meta != undefined ? action.meta.trait : null
  const _entities = action.payload != undefined ? action.payload.entities : undefined

  switch(action.type) {
  case FETCH_SUCCESS:
    return mergeStateWithNormalizedEntities(state, _entities)

  case PLY_UPDATE_SUCCESS:
    return { ...state, players: {
      ...state.players, [_id]: {
        ...state.players[_id], [_trait]: action.payload[_trait]
      }
    }}
  default:
    return state
  }
}

export function fetchCurrentPlayer() {
  return callApi({
    endpoint: '/api/v1/players',
    method: 'GET',
    types: [
      FETCH,
      {
        type: FETCH_SUCCESS,
        payload: (action, state, res) => {
          return getJSON(res).then((json) => normalize(json, schemas.players))
        }
      },
      FETCH_FAILURE
    ]
  })
}

export function updatePlayer(id, trait, value) {
  return callApi({
    endpoint: `/api/v1/players/${id}`,
    method: 'PATCH',
    body: JSON.stringify({ player: { [trait]: value }}),
    types: [
      PLY_UPDATE,
      { type: PLY_UPDATE_SUCCESS, meta: { trait: trait }},
      PLY_UPDATE_FAILURE
    ]
  })
}
