// @flow
import React from 'react'
import DocumentTitle from 'react-document-title'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import { hot } from 'react-hot-loader'

import App from './App.jsx'
import ThemeContainer from './themeContainer.jsx'
import Routes from '../routes.jsx'

const RootContainer = ({ store }: { store: Object }) => (
  <Provider store={store}>
    <ThemeContainer>
      <DocumentTitle title="Lot-Casting Atemi">
        <Router>
          <App>
            <Routes />
          </App>
        </Router>
      </DocumentTitle>
    </ThemeContainer>
  </Provider>
)

export default hot(module)(RootContainer) // eslint-disable-line no-undef
