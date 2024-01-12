/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Action, Middleware } from 'redux'

import { State } from 'ducks'
import {
  fetchAllCharacters,
  fetchAllQcs,
  fetchAllBattlegroups,
} from 'ducks/entities'
import { crudAction } from 'ducks/entities/_lib'

// Detects incomplete paginated requests and requests the next page
const pagyMiddleware: Middleware<object, State> =
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (store) => (next) => (action: Action) => {
    // @ts-expect-error API rewrite needed
    const page = parseInt(action?.meta?.page)
    // @ts-expect-error API rewrite needed
    const lastPage = parseInt(action?.meta?.lastPage)
    // eslint-enable @typescript-eslint/no-unsafe-argument

    if (page < lastPage) {
      switch (action.type) {
        case crudAction('character', 'FETCH_ALL').success.toString():
          // @ts-expect-error API rewrite needed
          store.dispatch(fetchAllCharacters(page + 1))
          break
        case crudAction('qc', 'FETCH_ALL').success.toString():
          // @ts-expect-error API rewrite needed
          store.dispatch(fetchAllQcs(page + 1))
          break
        case crudAction('battlegroup', 'FETCH_ALL').success.toString():
          // @ts-expect-error API rewrite needed
          store.dispatch(fetchAllBattlegroups(page + 1))
          break
      }
    }

    return next(action)
  }

export default pagyMiddleware
