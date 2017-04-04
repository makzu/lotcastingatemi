require('react-hot-loader/patch')
import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk'
import createHistory from 'history/createBrowserHistory'
import { configure } from 'redux-auth'

import reducer from './reducers'
import { fetchChronicle } from './actions'

import RootContainer from './containers/rootContainer.jsx'


const history = createHistory()

let enhancer

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk, routerMiddleware(history))
} else {
  enhancer = compose(
    applyMiddleware(thunk, routerMiddleware(history)),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
}

const store = createStore(
  reducer,
  undefined,
  enhancer
)

store.dispatch(configure({
  apiUrl: '/api/v1',
  clientOnly: true,
}))

// TODO: Only fetch chronicle/character data on login, not here
store.dispatch(fetchChronicle(1))

const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Component store={ store } history={ history } />
    </AppContainer>,
    document.getElementById('root')
  )
}

render(RootContainer)

if (module.hot) {
  module.hot.accept('./containers/rootContainer.jsx', () => {
    render( RootContainer )
  })
}
