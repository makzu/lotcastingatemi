import { getJSON } from 'redux-api-middleware'
import { BEGIN, COMMIT, REVERT } from 'redux-optimistic-ui'
import { createReducer } from 'redux-starter-kit'

import { callApi } from 'utils/api.js'
import { characterTraitTypes as entityTypes, crudAction } from './_lib'

export const createEntityReducer = (entityType: entityTypes) => {
  const pluralType = entityType + 's'
  return createReducer(undefined, {
    [crudAction(entityType, 'UPDATE').start.toString()]: (state, action) => {
      const { id } = action.meta
      const keys = Object.keys(action.payload)

      for (const key in action.payload) {
        if (action.payload.hasOwnProperty(key)) {
          state[pluralType][id][key] = action.payload[key]
        }
      }
    },
  })
}
