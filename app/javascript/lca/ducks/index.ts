import { combineReducers } from 'redux'
import { optimistic } from 'redux-optimistic-ui'

import AppReducer from './app.js'
import EntityReducer, { EntityState } from './entities'
import SessionReducer, { ISessionState } from './session'

export interface State {
  app: {}
  entities: { current: EntityState }
  session: ISessionState
}

const lcaApp = combineReducers({
  app: AppReducer,
  entities: optimistic(EntityReducer),
  session: SessionReducer,
})

export default lcaApp
