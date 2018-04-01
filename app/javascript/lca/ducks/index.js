import { combineReducers } from 'redux'

import EntityReducer from './entities'
import SessionReducer from './session.js'
import AppReducer from './app.js'

const lcaApp = combineReducers({
  app:              AppReducer,
  entities:         EntityReducer,
  session:          SessionReducer,
})

export default lcaApp
