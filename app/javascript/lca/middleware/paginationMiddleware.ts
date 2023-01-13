import { Middleware } from 'redux'

import { State } from 'ducks'
import { fetchAllCharacters } from 'ducks/entities'
import { crudAction } from 'ducks/entities/_lib'

// Detects incomplete paginated requests and requests the next page
const pagyMiddleware: Middleware<object, State> =
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (store) => (next) => (action) => {
    const page = parseInt(action?.meta?.page)
    const lastPage = parseInt(action?.meta?.lastPage)

    if (page < lastPage) {
      switch (action.type) {
        case crudAction('character', 'FETCH_ALL').success.toString():
          store.dispatch(fetchAllCharacters(page + 1))
          break
        case crudAction('qc', 'FETCH_ALL').success.toString():
          break
        case crudAction('battlegroup', 'FETCH_ALL').success.toString():
          break
      }
    }

    return next(action)
  }

export default pagyMiddleware
