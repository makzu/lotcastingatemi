// @flow
import { combineReducers } from 'redux'
import { optimistic } from 'redux-optimistic-ui'

import EntityReducer from './entities'
import SessionReducer from './session.js'
import AppReducer from './app.js'

// $FlowFixMe
const lcaApp = combineReducers({
  app: AppReducer,
  entities: optimistic(EntityReducer),
  session: SessionReducer,
})

export default lcaApp
