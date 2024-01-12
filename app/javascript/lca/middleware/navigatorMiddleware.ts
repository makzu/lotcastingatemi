import { CABLE_RECEIVED } from 'ducks/entities'
import { API, SUCCESS, crudAction } from 'ducks/entities/_lib'
import { Action, Middleware } from 'redux'
import { RootState } from 'store'
import history from 'utils/history'

/* On successfully creating an entity or joining a Chronicle, navigate to that
 * entity or Chronicle's page. Uses Push, so that the back button will work
 * as expected.
 */
const Navigator: Middleware<object, RootState> =
  (_store) => (next) => (action: Action) => {
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
