/* eslint-disable no-undef */
require('react-hot-loader/patch')

import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { createStore, applyMiddleware, compose } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { responsiveStoreEnhancer } from 'redux-responsive'
import thunk from 'redux-thunk'
import { apiMiddleware } from 'redux-api-middleware'

import authCookieMiddleware from './middleware/authCookieMiddleware.js'

import reducer from './ducks'
import { lcaInit } from './ducks/actions.js'

import RootContainer from './containers/rootContainer.jsx'

const makeEnhancer = (process.env.NODE_ENV === 'production') ? compose : composeWithDevTools

const enhancer = makeEnhancer(
  responsiveStoreEnhancer,
  applyMiddleware(thunk, apiMiddleware, authCookieMiddleware)
)

const store = createStore(
  reducer,
  undefined,
  enhancer
)

store.dispatch(lcaInit())

const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Component store={ store } />
    </AppContainer>,
    document.getElementById('root')
  )
}

render(RootContainer)

if (module.hot) {
  module.hot.accept('./containers/rootContainer.jsx', () => {
    render(RootContainer)
  })
}
