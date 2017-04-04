import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { authStateReducer } from 'redux-auth'
import * as c from '../utils/actionNames'

import EntityReducer from './entityReducer.js'

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

  case c.REQUEST_CHARACTER:
  case c.REQUEST_CHRONICLE:
  case c.UPDATE_CHARACTER:
  case c.CREATE_CHARACTER:
  case c.UPDATE_WEAPON:
  case c.CREATE_WEAPON:
  case c.UPDATE_MERIT:
  case c.CREATE_MERIT:
  case c.UPDATE_QC:
  case c.CREATE_QC:
    return { ...state, isFetching: true, isError: false }

  case c.RECEIVE_CHARACTER:
  case c.RECEIVE_CHRONICLE:
  case c.UPDATE_CHARACTER_COMPLETE:
  case c.CREATE_CHARACTER_COMPLETE:
  case c.UPDATE_WEAPON_COMPLETE:
  case c.CREATE_WEAPON_COMPLETE:
  case c.UPDATE_MERIT_COMPLETE:
  case c.CREATE_MERIT_COMPLETE:
  case c.UPDATE_QC_COMPLETE:
  case c.CREATE_QC_COMPLETE:
    return { ...state, isFetching: false, isError: false }

  default:
    return state
  }

}

const lcaApp = combineReducers({
  auth: authStateReducer,
  router: routerReducer,
  app: appReducer,
  entities: EntityReducer
})

export default lcaApp
