/* eslint-disable no-undef */
require('react-hot-loader/patch')

import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import { apiMiddleware } from 'redux-api-middleware'

import authTokenMiddleware from './middleware/authTokenMiddleware.js'
import themeSaverMiddleware from './middleware/themeSaverMiddleware.js'

import reducer from './ducks'
import { lcaInit } from './ducks/actions.js'

import RootContainer from './containers/rootContainer.jsx'

const makeEnhancer =
  process.env.NODE_ENV === 'production' ? compose : composeWithDevTools

const enhancer = makeEnhancer(
  applyMiddleware(
    thunk,
    apiMiddleware,
    authTokenMiddleware,
    themeSaverMiddleware
  )
)

const store = createStore(reducer, undefined, enhancer)

store.dispatch(lcaInit())

ReactDOM.render(
  <RootContainer store={store} />,
  document.getElementById('root')
)
