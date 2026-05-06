import { Provider } from 'react-redux'
import { Router } from 'react-router-dom'

import { useDocumentTitle } from '@lca/hooks/'
import Routes from '../routes.jsx'
import App from './App'
import ThemeContainer from './ThemeContainer'

type Props = {
  store: any
  history: any
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
