// @flow
import { Provider } from 'react-redux'
import { Router } from 'react-router-dom'

import App from './App'
import ThemeContainer from './ThemeContainer'
import Routes from '../routes.jsx'
import { useDocumentTitle } from 'hooks'

type Props = {
  store: any,
  history: any,
}
const RootContainer = ({ store, history }: Props) => {
  useDocumentTitle('Lot-Casting Atemi')
  return (
    <Provider store={store}>
      <ThemeContainer>
        <Router history={history}>
          <App>
            <Routes />
          </App>
        </Router>
      </ThemeContainer>
    </Provider>
  )
}

export default RootContainer
