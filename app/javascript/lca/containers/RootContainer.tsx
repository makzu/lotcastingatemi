import { Provider } from 'react-redux'
import { Router } from 'react-router-dom'

import { useDocumentTitle } from '@lca/hooks/index.ts'
import type store from '@lca/store.ts'
import Routes from '../routes.tsx'
import App from './App.tsx'
import ThemeContainer from './ThemeContainer.tsx'

type Props = {
  store: typeof store
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
