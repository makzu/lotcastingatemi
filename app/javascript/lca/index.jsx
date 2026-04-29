// @flow
/* eslint-disable no-undef */
import 'typeface-roboto'

import React from 'react'
import ReactDOM from 'react-dom'

// import './i18n'

import RootContainer from './containers/rootContainer.jsx'
import { lcaInit } from './ducks/actions.ts'
import store from './store'
import history from './utils/history'

store.dispatch(lcaInit())

ReactDOM.render(
  <RootContainer store={store} history={history} />,
  // $FlowThisIsOkayISwear
  document.getElementById('root'),
)
