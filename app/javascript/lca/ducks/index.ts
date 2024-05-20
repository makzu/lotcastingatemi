import { combineReducers } from 'redux'
import { optimistic } from 'redux-optimistic-ui'

import AppReducer from './app'
import { defaultState, type EntityState } from './entities'
import SessionReducer, { type ISessionState } from './session'
import DrawerReducer from 'features/drawerSlice'
import ThemeReducer from 'features/themeSlice'
// import newEntityReducer from '@/ducks.new/entities'
import { emptySplitApi } from '@/features/api'
import { createSlice } from '@reduxjs/toolkit'

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

const blankEntityReducer = createSlice({
  name: 'entities',
  initialState: { current: defaultState },
  reducers: {},
})

const blankAppReducer = createSlice({
  name: 'app',
  initialState: {
    loading: false,
    error: false,
    errorMessage: '',
  },
  reducers: {},
})

const lcaApp = combineReducers({
  // app: AppReducer,
  app: blankAppReducer.reducer,
  drawer: DrawerReducer,
  //entities: optimistic(EntityReducer),
  entities: blankEntityReducer.reducer,
  // newEntities: newEntityReducer,
  session: SessionReducer,
  theme: ThemeReducer,
  [emptySplitApi.reducerPath]: emptySplitApi.reducer,
})

export default lcaApp
