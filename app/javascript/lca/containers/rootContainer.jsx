import React from 'react'
import { Provider } from 'react-redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { AuthGlobals } from 'redux-auth/material-ui-theme'

import { ConnectedRouter } from 'react-router-redux'
import { Route, Link } from 'react-router-dom'

import CharacterSheet from '../components/characterSheet/index.jsx'
import LcaHeader from '../components/header.jsx'
import LcaFooter from '../components/footer.jsx'
import WelcomePage from '../components/welcomePage/index.jsx'

function QcSheet(props) {
  return(<span>QC Sheet!</span>)
}

class RootContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { store, history } = this.props

    return (<Provider store={ store }>
      <MuiThemeProvider>
        <div>
          <AuthGlobals />
          <ConnectedRouter history={ history }>
            <div>
              <LcaHeader />
              <Route path="/" exact component={ WelcomePage } />
              <Route path="/character" component={ CharacterSheet } />
              <Route path="/qcs" component={ QcSheet } />
              <LcaFooter />
            </div>
          </ConnectedRouter>
        </div>
      </MuiThemeProvider>
    </Provider>)
  }
}

export default RootContainer
