import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import App from './App.jsx'
import Routes from '../routes.jsx'

const RootContainer = ({ store }) => (
  <Provider store={ store }>
    <MuiThemeProvider>
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

export default RootContainer
