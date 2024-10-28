import { configureStore } from '@reduxjs/toolkit'
// import { apiMiddleware } from 'redux-api-middleware'

import reducer from '@/ducks'
import { emptySplitApi } from '@/features/api'
// import authTokenMiddleware from '@/middleware/authTokenMiddleware'
// import navigatorMiddleware from '@/middleware/navigatorMiddleware'
// import paginationMiddleware from '@/middleware/paginationMiddleware'
// import themeSaverMiddleware from '@/middleware/themeSaverMiddleware'
import { listenerMiddleware } from '@/middleware/listenerMiddleware'
import { rtkQueryErrorLogger } from '@/middleware/rtkQueryErrorLogger'

const middleware = [
  // apiMiddleware,
  // authTokenMiddleware,
  // navigatorMiddleware,
  // paginationMiddleware,
  listenerMiddleware.middleware,
  rtkQueryErrorLogger,
  emptySplitApi.middleware,
]

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(middleware),
})

export default store

export type StoreType = typeof store
export type RootState = ReturnType<typeof reducer>
export type GetState = typeof store.getState
export type AppDispatch = typeof store.dispatch
