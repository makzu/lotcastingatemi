import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { apiMiddleware } from 'redux-api-middleware'
import { optimistic } from 'redux-optimistic-ui'

import AppReducer from '@lca/ducks/app'
import EntityReducer from '@lca/ducks/entities'
import SessionReducer from '@lca/ducks/session'
import drawerSlice from '@lca/features/drawerSlice'
import themeSlice from '@lca/features/themeSlice'
import authTokenMiddleware from '@lca/middleware/authTokenMiddleware.js'
import navigatorMiddleware from '@lca/middleware/navigatorMiddleware.js'
import paginationMiddleware from '@lca/middleware/paginationMiddleware'
import themeSaverMiddleware from '@lca/middleware/themeSaverMiddleware.js'

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
  theme: themeSlice,
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
