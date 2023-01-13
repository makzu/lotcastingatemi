import { apiMiddleware } from 'redux-api-middleware'
import { configureStore } from '@reduxjs/toolkit'

import authTokenMiddleware from './middleware/authTokenMiddleware.js'
import navigatorMiddleware from './middleware/navigatorMiddleware.js'
import themeSaverMiddleware from './middleware/themeSaverMiddleware.js'
import paginationMiddleware from 'middleware/paginationMiddleware'

import reducer from './ducks'

const middleware = [
  apiMiddleware,
  authTokenMiddleware,
  navigatorMiddleware,
  themeSaverMiddleware,
  paginationMiddleware,
]

// export default () =>
//   configureStore({
//     reducer,
//     middleware,
//     devTools: !PRODUCTION,
//   })

export default function configureAppStore(preloadedState) {
  const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(middleware),
    preloadedState,
  })

  return store
}
