import { combineReducers } from 'redux'
import { optimistic } from 'redux-optimistic-ui'

import AppReducer from './app.js'
import EntityReducer, { EntityState } from './entities'
import SessionReducer, { ISessionState } from './session'

interface AppState {
  drawerOpen: boolean
  theme: 'dark' | 'light'
  loading: boolean
  error: boolean
  errorMessage: string
}

export interface State {
  app: AppState
  entities: { current: EntityState }
  session: ISessionState
}

const lcaApp = combineReducers({
  app: AppReducer,
  entities: optimistic(EntityReducer),
  session: SessionReducer,
})

export default lcaApp
