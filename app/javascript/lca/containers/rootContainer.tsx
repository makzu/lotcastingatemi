import React from 'react'
import DocumentTitle from 'react-document-title'
import { Provider } from 'react-redux'
import { Router } from 'react-router-dom'
import App from './App'
import ThemeContainer from './ThemeContainer'
import Routes from '../routes'
type Props = {
  store: $TSFixMe
  history: $TSFixMe
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

export default RootContainer
