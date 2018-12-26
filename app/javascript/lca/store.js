// @flow
import { applyMiddleware, compose, createStore } from 'redux'
import { apiMiddleware } from 'redux-api-middleware'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import { offline } from '@redux-offline/redux-offline'
import offlineConfig from '@redux-offline/redux-offline/lib/defaults'

import authTokenMiddleware from './middleware/authTokenMiddleware.js'
import themeSaverMiddleware from './middleware/themeSaverMiddleware.js'
import navigatorMiddleware from './middleware/navigatorMiddleware.js'

import rootReducer from './ducks'

// eslint-disable-next-line no-undef
const isProduction = () => process.env.NODE_ENV === 'production'

export default function configureStore(preloadedState) {
  const middlewares = [
    thunk,
    apiMiddleware,
    authTokenMiddleware,
    themeSaverMiddleware,
    navigatorMiddleware,
  ]
  const middlewareEnhancer = applyMiddleware(...middlewares)

  const lcaOfflineConfig = {
    ...offlineConfig,
    persistOptions: {
      whitelist: ['entities'],
    },
  }

  const enhancers = [middlewareEnhancer, offline(lcaOfflineConfig)]

  const makeEnhancer = isProduction() ? compose : composeWithDevTools
  const composedEnhancers = makeEnhancer(...enhancers)

  const store = createStore(rootReducer, preloadedState, composedEnhancers)

  //*
  // eslint-disable-next-line no-undef
  if (process.env.NODE_ENV !== 'production' && module.hot) {
    // eslint-disable-next-line no-undef
    module.hot.accept('./ducks', () => store.replaceReducer(rootReducer))
  }
  // */
  return store
}
