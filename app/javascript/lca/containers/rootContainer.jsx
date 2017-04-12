import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import { ConnectedRouter } from 'react-router-redux'

import RouteContainer from './routeContainer.jsx'

const RootContainer = ({ store, history }) => (
  <Provider store={ store }>
    <MuiThemeProvider>
      <ConnectedRouter history={ history }>
        <RouteContainer />
      </ConnectedRouter>
    </MuiThemeProvider>
  </Provider>
)

RootContainer.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
}

export default RootContainer
