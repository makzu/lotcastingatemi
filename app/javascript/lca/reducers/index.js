import { combineReducers } from 'redux';

const initialState = {
  character: {}
}

function lcaReducer(state = initialState, action) {
  return state
}

const lcaApp = combineReducers({
  lcaReducer
});

export default lcaApp
