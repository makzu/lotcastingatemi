// @flow
import {
  CHN_JOIN_SUCCESS,
  CHN_CREATE_SUCCESS,
} from 'ducks/entities/chronicle.js'
import { CHA_CREATE_SUCCESS } from 'ducks/entities/character.js'
import { QC_CREATE_SUCCESS, QC_DUPE_SUCCESS } from 'ducks/entities/qc.js'
import { history } from 'containers/rootContainer.jsx'

/* On successfully creating an entity or joining a Chronicle, navigate to that
 * entity or Chronicle's page. Uses Push, so that the back button will work
 * as expected.
*/
// eslint-disable-next-line no-unused-vars
const Navigator = (store: Object) => (next: Function) => (action: Object) => {
  switch (action.type) {
    case CHN_JOIN_SUCCESS:
    case CHN_CREATE_SUCCESS:
      history.push(`/chronicles/${action.payload.result}`)
      break
    case CHA_CREATE_SUCCESS:
      history.push(`/characters/${action.payload.id}`)
      break
    case BG_CREATE_SUCCESS:
      history.push(`/battlegroups/${action.payload.id}`)
      break
    case QC_CREATE_SUCCESS:
    case QC_DUPE_SUCCESS:
      history.push(`/qcs/${action.payload.id}`)
      break
  }

  return next(action)
}

export default Navigator
