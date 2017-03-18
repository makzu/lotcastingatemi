import thunk from 'redux-thunk'
import { createStore, applyMiddleware, compose } from 'redux'

import reducer from '../reducers'

const enhancer = compose(
  applyMiddleware(thunk),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

function configureStore() {
  return createStore(
    reducer,
    undefined,
    enhancer
  )
}

export default configureStore
