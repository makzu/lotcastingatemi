import React from 'react'
import { Route } from 'react-router-dom'

import CharacterList from './components/characterList/index.jsx'
import CharacterSheet from './components/characterSheet/index.jsx'
import MeritFullPage from './components/characterSheet/MeritFullPage.jsx'
import QcSheet from './components/qcSheet/index.jsx'
import BgSheet from './components/bgSheet/index.jsx'
import WelcomePage from './components/pages/welcomePage.jsx'
import SignupPage from './components/account/signupPage.jsx'

export default function Routes() {
  return (
    <div>
      <Route exact path="/" component={ WelcomePage } />

      <Route path="/signup" component={ SignupPage } />

      <Route exact path="/characters/" component={ CharacterList } />
      <Route exact path="/characters/:characterId" component={ CharacterSheet } />
      <Route path="/characters/:characterId/merits" component={ MeritFullPage } />

      <Route path="/qcs/:qcId" component={ QcSheet } />
      <Route path="/battlegroups/:bgId" component={ BgSheet } />
    </div>
  )
}
