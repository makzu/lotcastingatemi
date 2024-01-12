import 'typeface-roboto'

import ReactDOM from 'react-dom'

// import './i18n'

import store from './store'
import { lcaInit } from './ducks/actions'

import RootContainer from './containers/RootContainer'

store.dispatch(lcaInit())

ReactDOM.render(
  <RootContainer store={store} />,
  // $FlowThisIsOkayISwear
  document.getElementById('root'),
)
