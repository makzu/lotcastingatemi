import 'typeface-roboto'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import RootContainer from './containers/rootContainer.jsx'
import { lcaInit } from './ducks/actions.ts'
import store from './store'
import history from './utils/history'

store.dispatch(lcaInit())

const container = document.getElementById('root')
const root = createRoot(container)

root.render(
  <StrictMode>
    <RootContainer store={store} history={history} />
  </StrictMode>,
)
