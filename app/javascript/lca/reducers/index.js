import { combineReducers } from 'redux';
import * as c from '../utils/constants'

import { defaultState } from './defaultState.js'
import CharacterReducer from './characterReducer.js'

function appReducer(state = defaultState, action) {
  switch (action.type) {
  case c.REQUEST_CHAR:
    return {... state, isFetching: true, isError: false }

  case c.RECEIVE_CHAR:
    return {... state, isFetching: false, isError: false }

  case c.TOGGLE_EDITOR:
    return {... state, isEditing: !state.isEditing }

  case c.UPDATE_CHAR:
  case c.UPDATE_WEAP:
  case c.UPDATE_MERIT:
    return {... state, isFetching: true }

  case c.UPDATE_CHAR_COMPLETE:
  case c.UPDATE_WEAP_COMPLETE:
  case c.UPDATE_MERIT_COMPLETE:
    return {... state, isFetching: false }

  default:
    return state
  }

}

const lcaApp = combineReducers({
  app : appReducer,
  character : CharacterReducer
});

export default lcaApp
