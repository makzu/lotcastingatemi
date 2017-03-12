import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import CharacterSheet from './components/characterSheet.jsx'

import reducer from './reducers'

const store = createStore(reducer)

render(
  <Provider store={store}>
    <CharacterSheet id={1} />
  </Provider>,
  document.getElementById('root')
)
