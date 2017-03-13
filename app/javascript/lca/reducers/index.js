import { combineReducers } from 'redux';
//import { characterReducer } from './characterReducer.js'
import { REQUEST_CHAR, RECEIVE_CHAR } from '../actions'

import { defaultState } from './defaultState.js'

function characterReducer(state = defaultState, action) {
  switch (action.type) {
  case REQUEST_CHAR:
    return {... state, isFetching: true, isError: false }
  case RECEIVE_CHAR:
    return {... state,
      isFetching: false,
      isError: false,
      character: action.character
    }
  default:
    return state
  }
}

function lcaReducer(state = defaultState, action) {
  switch(action.type) {
  default:
    return state
  }
}

const lcaApp = combineReducers({
  lcaReducer, cha : characterReducer
});

export default lcaApp
