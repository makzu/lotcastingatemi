/* eslint-disable no-undef */
require('react-hot-loader/patch')
import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { apiMiddleware } from 'redux-api-middleware'
import authCookieMiddleware from './middleware/authCookieMiddleware.js'

import reducer from './ducks'
import { lcaInit } from './ducks/actions.js'

import RootContainer from './containers/rootContainer.jsx'

let enhancer

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk, apiMiddleware, authCookieMiddleware)
} else {
  enhancer = compose(
    applyMiddleware(thunk, apiMiddleware, authCookieMiddleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
}

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
