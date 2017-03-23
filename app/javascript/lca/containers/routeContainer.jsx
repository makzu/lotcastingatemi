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
      <Drawer open={ false } docked={ true }>
        <h2>Something in the drawer</h2>
        <p>Something else in the drawer too.</p>
      </Drawer>

      <Route exact path="/" component={ WelcomePage } />
      <Route path="/characters/:characterId" component={ CharacterSheet } />
      <Route path="/qcs/:qcId" component={ QcSheet } />
    </div>
  )
}
