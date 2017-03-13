require("react-hot-loader/patch")

//import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import configureStore from './store/configureStore.js';
import RootContainer from './containers/rootContainer.jsx';


const store = configureStore();

render(
  <AppContainer>
    <RootContainer store={ store }/>
  </AppContainer>,
  document.getElementById('root')
);


if (module.hot) {
  module.hot.accept('./containers/rootContainer.jsx', () => {
    //const NewRoot = require('./containers/rootContainer.jsx').default;
    render(
      <AppContainer>
        <RootContainer store={ store } />
      </AppContainer>,
      document.getElementById('root')
    );
  });
}

// */
