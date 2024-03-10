// @flow
import { callApi } from 'utils/api'
import { createApiActions, mergeEntity } from './_entity'
import {
  crudAction,
  massagePayload,
  reducerUpdateAction,
  standardTypes,
  successMeta,
} from './_lib'

const CHRONICLE = 'chronicle'

export default {
  [crudAction(CHRONICLE, 'CREATE').success.toString()]: mergeEntity,
  [crudAction(CHRONICLE, 'FETCH').success.toString()]: mergeEntity,
  [crudAction(CHRONICLE, 'JOIN').success.toString()]: mergeEntity,
  [crudAction(CHRONICLE, 'ADD_THING').success.toString()]: mergeEntity,
  [crudAction(CHRONICLE, 'REGEN_CODE').success.toString()]: mergeEntity,
  [crudAction(CHRONICLE, 'UPDATE').start.toString()]: reducerUpdateAction(
    CHRONICLE + 's',
  ),
  [crudAction('character', 'FETCH_FOR_CHRONICLE').success.toString()]: (
    state,
    action,
  ) => {
    const newState = mergeEntity(state, action)

    const { chronicleId } = action.meta
    newState.chronicles[chronicleId].characters = [
      ...(state.chronicles[chronicleId].characters ?? []),
      ...action.payload.result,
    ]

    return newState
  },
  [crudAction('qc', 'FETCH_FOR_CHRONICLE').success.toString()]: (
    state,
    action,
  ) => {
    const newState = mergeEntity(state, action)

    const { chronicleId } = action.meta
    newState.chronicles[chronicleId].qcs = [
      ...(state.chronicles[chronicleId].qcs ?? []),
      ...action.payload.result,
    ]

    return newState
  },
  [crudAction('battlegroup', 'FETCH_FOR_CHRONICLE').success.toString()]: (
    state,
    action,
  ) => {
    const newState = mergeEntity(state, action)

    const { chronicleId } = action.meta
    newState.chronicles[chronicleId].battlegroups = [
      ...(state.chronicles[chronicleId].battlegroups ?? []),
      ...action.payload.result,
    ]

    return newState
  },
  [crudAction(CHRONICLE, 'REMOVE_PLAYER').success.toString()]: (
    state,
    action,
  ) => {
    mergeEntity(state, action)

    const { id, playerId } = action.meta
    const myId = state.currentPlayer

    if (playerId === myId) {
      // We are leaving a chronicle ourselves
      state.players[myId].chronicles = state.players[myId].chronicles.filter(
        (i) => i !== id,
      )
      delete state.chronicles[id]
    }
    // TODO: remove orphaned entities and traits from state
  },
  [crudAction(CHRONICLE, 'REMOVE_THING').success.toString()]: (
    state,
    action,
  ) => {
    mergeEntity(state, action)
    // TODO: remove orphaned entities and traits from state
  },
}

// tslint:disable variable-name
export const [
  createChronicle,
  _DO_NOT_USE_duplicateChronicle,
  fetchChronicle,
  _DO_NOT_USE_fetchAllChronicles,
  updateChronicle,
  destroyChronicle,
] = createApiActions(CHRONICLE)
// tslint:enable variable-name

export function fetchChronicleCharacters(id: number, page = 1) {
  const action = crudAction('character', 'FETCH_FOR_CHRONICLE')
  return callApi({
    endpoint: `/api/v1/chronicles/${id}/characters?page=${page}`,
    method: 'GET',
    types: standardTypes(
      'character',
      action,
      massagePayload('characterList'),
      (...args) => ({ ...successMeta(...args), chronicleId: id }),
    ),
  })
}

export function fetchChronicleQcs(id: number, page = 1) {
  const action = crudAction('qc', 'FETCH_FOR_CHRONICLE')
  return callApi({
    endpoint: `/api/v1/chronicles/${id}/qcs?page=${page}`,
    method: 'GET',
    types: standardTypes('qc', action, massagePayload('qcList'), (...args) => ({
      ...successMeta(...args),
      chronicleId: id,
    })),
  })
}

export function fetchChronicleBattlegroups(id: number, page = 1) {
  const action = crudAction('battlegroup', 'FETCH_FOR_CHRONICLE')
  return callApi({
    endpoint: `/api/v1/chronicles/${id}/battlegroups?page=${page}`,
    method: 'GET',
    types: standardTypes(
      'battlegroup',
      action,
      massagePayload('battlegroupList'),
      (...args) => ({ ...successMeta(...args), chronicleId: id }),
    ),
  })
}

export function joinChronicle(code: string) {
  const action = crudAction(CHRONICLE, 'JOIN')
  return callApi({
    body: JSON.stringify({ invite_code: code }),
    endpoint: '/api/v1/chronicles/join',
    types: standardTypes(CHRONICLE, action),
  })
}

export function regenChronicleInviteCode(id: number) {
  const action = crudAction(CHRONICLE, 'REGEN_CODE')
  return callApi({
    endpoint: `/api/v1/chronicles/${id}/regen_invite_code`,
    types: standardTypes(CHRONICLE, action),
  })
}

// TODO: Flush the store of the removed player's data
export function removePlayerFromChronicle(id: number, playerId: number) {
  const action = crudAction(CHRONICLE, 'REMOVE_PLAYER')
  return callApi({
    endpoint: `/api/v1/chronicles/${id}/remove_player/${playerId}`,
    types: standardTypes(CHRONICLE, action),
  })
}

export function addThingToChronicle(
  id: number,
  thingId: number,
  thingType: 'character' | 'qc' | 'battlegroup',
) {
  const action = crudAction(CHRONICLE, 'ADD_THING')
  return callApi({
    endpoint: `/api/v1/chronicles/${id}/add_${thingType}/${thingId}`,
    types: standardTypes(CHRONICLE, action),
  })
}

/* TODO: Flush other players' remove entities from state on success */
export function removeThingFromChronicle(
  id: number,
  thingId: number,
  type: string,
) {
  const action = crudAction(CHRONICLE, 'REMOVE_THING')
  return callApi({
    endpoint: `/api/v1/chronicles/${id}/remove_${type}/${thingId}`,
    types: standardTypes(CHRONICLE, action),
  })
}
