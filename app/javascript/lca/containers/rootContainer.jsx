import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import RouteContainer from './routeContainer.jsx'

const RootContainer = ({ store }) => (
  <Provider store={ store }>
    <MuiThemeProvider>
      <RouteContainer />
    </MuiThemeProvider>
  </Provider>
)

RootContainer.propTypes = {
  store: PropTypes.object.isRequired
}

export default RootContainer
