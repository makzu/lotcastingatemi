// @flow
import { createApiActions, createEntityReducer, mergeEntity } from './_entity'
import { crudAction, standardTypes } from './_lib'

import { callApi } from 'utils/api.js'

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
