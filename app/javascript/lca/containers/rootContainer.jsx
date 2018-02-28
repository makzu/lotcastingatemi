import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import { hot } from 'react-hot-loader'
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles'

import App from './App.jsx'
import Routes from '../routes.jsx'

const theme = createMuiTheme()

const RootContainer = ({ store }) => (
  <Provider store={ store }>
    <MuiThemeProvider theme={ theme }>
      <Router>
        <App>
          <Routes />
        </App>
      </Router>
    </MuiThemeProvider>
  </Provider>
)

RootContainer.propTypes = {
  store: PropTypes.object.isRequired
}

export default hot(module)(RootContainer)
