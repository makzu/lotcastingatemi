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

import reducer from './reducers'
import { fetchChronicle } from './actions'

import RootContainer from './containers/rootContainer.jsx'


const history = createHistory()
let enhancer

if (process.env.NODE_ENV === 'production') { // eslint-disable-line no-undef
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

if (module.hot) { // eslint-disable-line no-undef
  module.hot.accept('./containers/rootContainer.jsx', () => { // eslint-disable-line no-undef
    render( RootContainer )
  })
}
