import createCachedSelector from 're-reselect'

import { ICharacter } from 'types'
import { callApi } from 'utils/api.js'
import { createApiActions, createEntityReducer, mergeEntity } from './_entity'
import { crudAction, standardTypes } from './_lib'
import { EntityState, WrappedEntityState } from './_types'

const unwrapped = (state: WrappedEntityState): EntityState =>
  state.entities.current

const CHARACTER = 'character'

export default createEntityReducer(CHARACTER, {
  [crudAction(CHARACTER, 'CHANGE_TYPE').success.toString()]: mergeEntity,
})

export const [
  createCharacter,
  duplicateCharacter,
  fetchCharacter,
  fetchAllCharacters,
  updateCharacter,
  destroyCharacter,
] = createApiActions(CHARACTER)

export function changeCharacterType(id: number, type: string) {
  const action = crudAction(CHARACTER, 'CHANGE_TYPE')
  return callApi({
    body: JSON.stringify({ type }),
    endpoint: `/api/v1/characters/${id}/change_type`,
    types: standardTypes(CHARACTER, action),
  })
}

export const getSpecificCharacter = (state: WrappedEntityState, id: number) =>
  unwrapped(state).characters[id]

const getMerits = (state: WrappedEntityState) => unwrapped(state).merits

export const getMeritsForCharacter = createCachedSelector(
  [getSpecificCharacter, getMerits],
  (character, merits) => character.merits.map(m => merits[m])
)((state, id) => id)
