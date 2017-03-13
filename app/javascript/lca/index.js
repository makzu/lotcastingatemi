import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux'
//import { apiMiddleware } from 'redux-api-middleware'
import thunk from 'redux-thunk'

import reducer from './reducers'
import { Provider } from 'react-redux'
import RootContainer from './containers/rootContainer.jsx'

import { defaultState } from './reducers'

const enhancer = compose(
  applyMiddleware(thunk),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const store = createStore(
  reducer,
  defaultState,
  enhancer
);

render(
  <Provider store={ store }>
    <RootContainer />
  </Provider>,
  document.getElementById('root')
)
