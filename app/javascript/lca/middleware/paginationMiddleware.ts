import type { Middleware } from 'redux'

import {
  fetchAllBattlegroups,
  fetchAllCharacters,
  fetchAllQcs,
  fetchChronicleBattlegroups,
  fetchChronicleCharacters,
  fetchChronicleQcs,
} from '@lca/ducks/entities'
import { crudAction } from '@lca/ducks/entities/_lib'
import type { RootState } from '@lca/store'

// Detects incomplete paginated requests and requests the next page
// biome-ignore lint/complexity/noBannedTypes: https://redux.js.org/usage/usage-with-typescript#type-checking-middleware
const pagyMiddleware: Middleware<{}, RootState> =
  (store) => (next) => (action) => {
    const page = parseInt(action?.meta?.page, 10)
    const lastPage = parseInt(action?.meta?.lastPage, 10)
    const chronicleId = parseInt(action?.meta?.chronicleId, 10)

    if (page < lastPage) {
      switch (action.type) {
        case crudAction('character', 'FETCH_ALL').success.toString():
          store.dispatch(fetchAllCharacters(page + 1))
          break
        case crudAction('qc', 'FETCH_ALL').success.toString():
          store.dispatch(fetchAllQcs(page + 1))
          break
        case crudAction('battlegroup', 'FETCH_ALL').success.toString():
          store.dispatch(fetchAllBattlegroups(page + 1))
          break
        case crudAction('character', 'FETCH_FOR_CHRONICLE').success.toString():
          store.dispatch(fetchChronicleCharacters(chronicleId, page + 1))
          break
        case crudAction('qc', 'FETCH_FOR_CHRONICLE').success.toString():
          store.dispatch(fetchChronicleQcs(chronicleId, page + 1))
          break
        case crudAction(
          'battlegroup',
          'FETCH_FOR_CHRONICLE',
        ).success.toString():
          store.dispatch(fetchChronicleBattlegroups(chronicleId, page + 1))
          break
      }
    }

    return next(action)
  }

export default pagyMiddleware
