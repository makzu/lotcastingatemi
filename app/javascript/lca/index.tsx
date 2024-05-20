import 'typeface-roboto'

import { createRoot } from 'react-dom/client'

import RootContainer from './containers/RootContainer'
import { lcaInit } from './ducks/actions'
import store from './store'

store.dispatch(lcaInit())

const container = document.getElementById('root')!
const root = createRoot(container)
root.render(<RootContainer store={store} />)
