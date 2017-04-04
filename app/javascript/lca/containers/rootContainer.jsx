import React, { PropTypes } from 'react'
import { Provider } from 'react-redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { AuthGlobals } from 'redux-auth/material-ui-theme'

import { ConnectedRouter } from 'react-router-redux'

import RouteContainer from './routeContainer.jsx'

const RootContainer = ({ store, history }) => (
  <Provider store={ store }>
    <MuiThemeProvider>
      <div>
        <AuthGlobals />
        <ConnectedRouter history={ history }>
          <RouteContainer />
        </ConnectedRouter>
      </div>
    </MuiThemeProvider>
  </Provider>
)

RootContainer.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
}

export default RootContainer
