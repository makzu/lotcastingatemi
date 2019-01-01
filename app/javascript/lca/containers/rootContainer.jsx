// @flow
import React from 'react'
import DocumentTitle from 'react-document-title'
import { hot } from 'react-hot-loader/root'
import { Provider } from 'react-redux'
import { Router } from 'react-router-dom'

import App from './App.jsx'
import ThemeContainer from './themeContainer.jsx'
import Routes from '../routes.jsx'

type Props = {
  store: any,
  history: any,
}
const RootContainer = ({ store, history }: Props) => (
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

export default hot(RootContainer)
