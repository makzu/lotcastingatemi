import { apiMiddleware } from 'redux-api-middleware'
import { configureStore } from '@reduxjs/toolkit'

import authTokenMiddleware from './middleware/authTokenMiddleware'
import navigatorMiddleware from './middleware/navigatorMiddleware'
import themeSaverMiddleware from './middleware/themeSaverMiddleware'
import paginationMiddleware from 'middleware/paginationMiddleware'

import reducer from './ducks'

const middleware = [
  apiMiddleware,
  authTokenMiddleware,
  navigatorMiddleware,
  themeSaverMiddleware,
  paginationMiddleware,
]

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(middleware),
})

export default store

export type RootState = ReturnType<typeof reducer>
export type AppDispatch = typeof store.dispatch
