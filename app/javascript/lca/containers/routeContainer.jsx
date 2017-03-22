import React from 'react'

import { IndexRoute, Route, Redirect, Link } from 'react-router-dom'

import AppBar from 'material-ui/AppBar'
import Drawer from 'material-ui/Drawer'

import CharacterSheet from '../components/characterSheet/index.jsx'
import QcSheet from    '../components/qcSheet/index.jsx'

import LcaHeader from  '../components/header.jsx'
import LcaFooter from  '../components/footer.jsx'
import WelcomePage from '../components/welcomePage/index.jsx'

export default function RouteContainer(props) {
  return(
    <div>
      <AppBar title="Lot-Casting Atemi" />

      <Route exact path="/"><Redirect to="/characters/1" /></Route>
      <Route path="/characters/:characterId" component={ CharacterSheet } />
      <Route path="/qcs/:qcId" component={ QcSheet } />
    </div>
  )
    /*
    <Route path="/" component={ AppWrapper }>
      <Route exact path="/" component={ WelcomePage } />
      <Route path="/characters/:characterId" component={ CharacterSheet } />
      <Route path="/qcs/:qcId" component={ QcSheet } />
    </Route>
  )
  // */
}
