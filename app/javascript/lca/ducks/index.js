import { combineReducers } from 'redux'

import EntityReducer from './entities'
import SessionReducer from './account.js'
import { TOGGLE_MENU } from './actions.js'

const defaultState = {
  navDrawerOpen: false,
  isFetching: false,
  isError: false,
  isEditing: false
}

export function appReducer(state = defaultState, action) {
  switch (action.type) {

  case TOGGLE_MENU:
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
