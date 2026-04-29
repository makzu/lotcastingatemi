import type { Middleware } from 'redux'

import { CABLE_RECEIVED } from 'ducks/entities'
import { API, crudAction, SUCCESS } from 'ducks/entities/_lib'
import history from 'utils/history'
import type { RootState } from 'store'

/* On successfully creating an entity or joining a Chronicle, navigate to that
 * entity or Chronicle's page. Uses Push, so that the back button will work
 * as expected.
 */
// biome-ignore lint/complexity/noBannedTypes: https://redux.js.org/usage/usage-with-typescript#type-checking-middleware
const Navigator: Middleware<{}, RootState> = (_store) => (next) => (action) => {
  const act = action.type.split('/')
  if (
    act[0] === API &&
    act[3] === SUCCESS &&
    ['character', 'qc', 'battlegroup', 'chronicle'].includes(act[1]) &&
    ['JOIN', 'CREATE', 'DUPLICATE', 'CREATE_FROM_QC'].includes(act[2])
  ) {
    history.push(`/${act[1]}s/${action.payload.result}`)
  }

  switch (action.type) {
    case crudAction('player', 'DESTROY').success.toString():
      history.push('/deleted')
      break
    case CABLE_RECEIVED:
      if (
        action.payload.event === 'destroy' &&
        window.location.pathname.startsWith(
          `/${action.payload.type}/${action.payload.id}`,
        )
      )
        history.push('/content')
      break
  }

  return next(action)
}

export default Navigator
