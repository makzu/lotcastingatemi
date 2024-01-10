/* eslint-disable no-undef */
import 'typeface-roboto'

import React from 'react'
import ReactDOM from 'react-dom'

// import './i18n'

import configureStore from './store'
import history from './utils/history'
import { lcaInit } from './ducks/actions'

import RootContainer from './containers/rootContainer'

const store = configureStore()

store.dispatch(lcaInit())

ReactDOM.render(
  <RootContainer store={store} history={history} />,
  document.getElementById('root'),
)
