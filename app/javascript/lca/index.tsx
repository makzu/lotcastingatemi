import 'typeface-roboto'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'

import RootContainer from './containers/RootContainer'
import { lcaInit } from './ducks/actions'
import store from './store'

store.dispatch(lcaInit())

const container = document.getElementById('root')!
const root = createRoot(container)
root.render(
  <StrictMode>
    <Provider store={store}>
      <RootContainer />
    </Provider>
  </StrictMode>,
)
