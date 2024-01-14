import { combineReducers } from 'redux'
import { optimistic } from 'redux-optimistic-ui'

import AppReducer from './app'
import EntityReducer, { type EntityState } from './entities'
import SessionReducer, { type ISessionState } from './session'
import DrawerReducer from 'features/drawerSlice'
import ThemeReducer from 'features/themeSlice'

interface AppState {
  loading: boolean
  error: boolean
  errorMessage: string
}

/** @deprecated use RootState instead */
export interface State {
  app: AppState
  entities: { current: EntityState }
  session: ISessionState
}

const lcaApp = combineReducers({
  app: AppReducer,
  drawer: DrawerReducer,
  entities: optimistic(EntityReducer),
  session: SessionReducer,
  theme: ThemeReducer,
})

export default lcaApp
