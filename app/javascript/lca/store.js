// @flow
import { apiMiddleware } from 'redux-api-middleware'
import { configureStore } from 'redux-starter-kit'
import thunk from 'redux-thunk'

import authTokenMiddleware from './middleware/authTokenMiddleware.js'
import navigatorMiddleware from './middleware/navigatorMiddleware.js'
import themeSaverMiddleware from './middleware/themeSaverMiddleware.js'

import reducer from './ducks'

// eslint-disable-next-line no-undef
const PRODUCTION = process.env.NODE_ENV === 'production'

let middleware = [
  thunk,
  apiMiddleware,
  authTokenMiddleware,
  navigatorMiddleware,
  themeSaverMiddleware,
]
if (!PRODUCTION)
  middleware = middleware.concat(
    require('redux-immutable-state-invariant').default()
  )

export default () =>
  configureStore({
    reducer,
    middleware,
    devTools: !PRODUCTION,
  })
