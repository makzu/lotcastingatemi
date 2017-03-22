import React from 'react'
import { Provider } from 'react-redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { AuthGlobals } from 'redux-auth/material-ui-theme'

import { ConnectedRouter } from 'react-router-redux'

import RouteContainer from './routeContainer.jsx'


class RootContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { store, history } = this.props

    return (
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
  }
}

export default RootContainer
