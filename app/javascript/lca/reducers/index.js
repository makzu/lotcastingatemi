import { combineReducers } from 'redux'
import * as c from '../utils/actionNames'

import EntityReducer from './entityReducer.js'
import SessionReducer from '../ducks/account.js'

const defaultState = {
  navDrawerOpen: false,
  isFetching: false,
  isError: false,
  isEditing: false
}

export function appReducer(state = defaultState, action) {
  switch (action.type) {

  case c.TOGGLE_MENU:
    return { ...state, navDrawerOpen: !state.navDrawerOpen }

  default:
    return state
  }

}

const lcaApp = combineReducers({
  app: appReducer,
  session: SessionReducer,
  entities: EntityReducer
})

export default lcaApp
