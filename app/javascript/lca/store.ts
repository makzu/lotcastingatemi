import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { apiMiddleware } from 'redux-api-middleware'
import { optimistic } from 'redux-optimistic-ui'

import AppReducer from '@lca/ducks/app.ts'
import EntityReducer from '@lca/ducks/entities/index.ts'
import SessionReducer from '@lca/ducks/session.ts'
import drawerSlice from '@lca/features/drawerSlice.ts'
import themeSlice from '@lca/features/themeSlice.ts'
import authTokenMiddleware from '@lca/middleware/authTokenMiddleware.ts'
import navigatorMiddleware from '@lca/middleware/navigatorMiddleware.ts'
import paginationMiddleware from '@lca/middleware/paginationMiddleware.ts'
import themeSaverMiddleware from '@lca/middleware/themeSaverMiddleware.ts'

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
