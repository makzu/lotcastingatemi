import { combineReducers } from 'redux'

import EntityReducer from './entities'
import SessionReducer from './account.js'

const lcaApp = combineReducers({
  entities:         EntityReducer,
  session:          SessionReducer,
})

export default lcaApp
