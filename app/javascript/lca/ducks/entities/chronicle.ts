import { CharacterType } from '@/types'
import { callApi } from '@/utils/api'
import { createApiActions, mergeEntity } from './_entity'
import { crudAction, reducerUpdateAction, standardTypes } from './_lib'

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

export const [
  createChronicle,
  _DO_NOT_USE_duplicateChronicle,
  fetchChronicle,
  _DO_NOT_USE_fetchAllChronicles,
  updateChronicle,
  destroyChronicle,
] = createApiActions(CHRONICLE)

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
  thingType: CharacterType,
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
  type: CharacterType,
) {
  const action = crudAction(CHRONICLE, 'REMOVE_THING')
  return callApi({
    endpoint: `/api/v1/chronicles/${id}/remove_${type}/${thingId}`,
    types: standardTypes(CHRONICLE, action),
  })
}
