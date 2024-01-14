import 'typeface-roboto'

import ReactDOM from 'react-dom'

import store from './store'
import { lcaInit } from './ducks/actions'
import RootContainer from './containers/RootContainer'

store.dispatch(lcaInit())

ReactDOM.render(
  <RootContainer store={store} />,
  document.getElementById('root'),
)
