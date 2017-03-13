import { combineReducers } from 'redux';
//import { characterReducer } from './characterReducer.js'
import * as c from '../utils/constants'

import { defaultState } from './defaultState.js'

function characterReducer(state = null, action) {
  switch (action.type) {
  case c.RECEIVE_CHAR:
    return action.character
  case c.UPDATE_CHAR:
    const tr = action.update.trait
    const val = action.update.value
    return {... state, [tr]: val }
  default:
    return state
  }
}

function appReducer(state = defaultState, action) {
  switch (action.type) {
  case c.REQUEST_CHAR:
    return {... state, isFetching: true, isError: false }
  case c.RECEIVE_CHAR:
    return {... state, isFetching: false, isError: false }
  case c.TOGGLE_EDITOR:
    return {... state, isEditing: !state.isEditing }
  default:
    return state
  }

}

const lcaApp = combineReducers({
  app : appReducer,
  character : characterReducer
});

export default lcaApp
