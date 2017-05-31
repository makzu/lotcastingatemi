import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Paper from 'material-ui/Paper'

import LcaHeader from  '../components/header.jsx'

import CharacterList from '../components/characterList/index.jsx'
import CharacterSheet from '../components/characterSheet/index.jsx'
import MeritFullPage from '../components/characterSheet/MeritFullPage.jsx'
import QcSheet from '../components/qcSheet/index.jsx'
import WelcomePage from '../components/welcomePage/index.jsx'
import LoginForm from '../components/account/login.jsx'

export default function RouteContainer() {
  return(
    <Router>
      <div>
        <LcaHeader />
        <Paper className="contentWrapper">
          <Route exact path="/" component={ WelcomePage } />
          <Route path="/login" component={ LoginForm } />
          <Route exact path="/characters/" component={ CharacterList } />
          <Route exact path="/characters/:characterId" component={ CharacterSheet } />
          <Route path="/characters/:characterId/merits" component={ MeritFullPage } />
          <Route path="/qcs/:qcId" component={ QcSheet } />
        </Paper>
      </div>
    </Router>
  )
}
