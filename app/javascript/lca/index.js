// @flow
/* eslint-disable no-undef */
require('typeface-roboto')

import ReactDOM from 'react-dom'

import './i18n'

import store from './store'
import { lcaInit } from './ducks/actions.js'

import RootContainer from './containers/RootContainer'

store.dispatch(lcaInit())

ReactDOM.render(
  <RootContainer store={store} />,
  // $FlowThisIsOkayISwear
  document.getElementById('root'),
)
