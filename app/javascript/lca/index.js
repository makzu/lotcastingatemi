// @flow
/* eslint-disable no-undef */
require('typeface-roboto')

import { createBrowserHistory } from 'history'
import React from 'react'
import ReactDOM from 'react-dom'

import configureStore from './store.js'
import { lcaInit } from './ducks/actions.js'

import RootContainer from './containers/rootContainer.jsx'

export const history = createBrowserHistory()

const store = configureStore()

store.dispatch(lcaInit())

ReactDOM.render(
  <RootContainer store={store} history={history} />,
  // $FlowThisIsOkayISwear
  document.getElementById('root')
)
