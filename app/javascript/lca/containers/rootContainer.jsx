import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import { hot } from 'react-hot-loader'

import App from './App.jsx'
import ThemeContainer from './themeContainer.jsx'
import Routes from '../routes.jsx'

const RootContainer = ({ store }) => (
  <Provider store={ store }>
    <ThemeContainer>
      <Router>
        <App>
          <Routes />
        </App>
      </Router>
    </ThemeContainer>
  </Provider>
)

RootContainer.propTypes = {
  store: PropTypes.object.isRequired
}

export default hot(module)(RootContainer)
