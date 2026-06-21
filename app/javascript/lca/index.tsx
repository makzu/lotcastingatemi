import 'typeface-roboto'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import RootContainer from './containers/RootContainer.tsx'
import { lcaInit } from './ducks/actions.ts'
import store from './store.ts'
import history from './utils/history.ts'

store.dispatch(lcaInit())

const container = document.getElementById('root')
const root = createRoot(container)

root.render(
  <StrictMode>
    <RootContainer store={store} history={history} />
  </StrictMode>,
)
