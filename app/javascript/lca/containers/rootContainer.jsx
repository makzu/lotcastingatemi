// @flow
import React from 'react'
import DocumentTitle from 'react-document-title'
import { Provider } from 'react-redux'
import { Router } from 'react-router-dom'
import { createBrowserHistory } from 'history'

import App from './App.jsx'
import ThemeContainer from './themeContainer.jsx'
import Routes from '../routes.jsx'

export const history = createBrowserHistory()

const RootContainer = ({ store }: { store: Object }) => (
  <Provider store={store}>
    <ThemeContainer>
      <DocumentTitle title="Lot-Casting Atemi">
        <Router history={history}>
          <App>
            <Routes />
          </App>
        </Router>
      </DocumentTitle>
    </ThemeContainer>
  </Provider>
)

export default RootContainer
