import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { apiMiddleware } from 'redux-api-middleware'
import { optimistic } from 'redux-optimistic-ui'

import AppReducer from '@lca/ducks/app'
import EntityReducer from '@lca/ducks/entities'
import SessionReducer from '@lca/ducks/session'
import drawerSlice from './features/drawerSlice'
import authTokenMiddleware from './middleware/authTokenMiddleware.js'
import navigatorMiddleware from './middleware/navigatorMiddleware.js'
import themeSaverMiddleware from './middleware/themeSaverMiddleware.js'
import paginationMiddleware from 'middleware/paginationMiddleware'

const middleware = [
  apiMiddleware,
  authTokenMiddleware,
  navigatorMiddleware,
  themeSaverMiddleware,
  paginationMiddleware,
]

const reducer = combineReducers({
  app: AppReducer,
  entities: optimistic(EntityReducer),
  session: SessionReducer,
  drawer: drawerSlice,
})

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(middleware),

  devTools: true,
})

export default store

export type AppStore = typeof store
export type RootState = ReturnType<typeof reducer>
export type AppDispatch = AppStore['dispatch']
