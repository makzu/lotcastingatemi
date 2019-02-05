// @flow
import * as React from 'react'
import { Switch, Route } from 'react-router-dom'

import BioFullPage from './BioFullPage'
import CharmFullPage from './charms/'
import CharacterSheet from './CharacterSheet'
import MeritFullPage from './MeritFullPage'

const characterSheetWrapper = () => {
  return (
    <Switch>
      <Route path="/characters/:characterId/merits" component={MeritFullPage} />
      <Route path="/characters/:characterId/charms" component={CharmFullPage} />
      <Route path="/characters/:characterId/bio" component={BioFullPage} />
      <Route path="/characters/:characterId" component={CharacterSheet} />
    </Switch>
  )
}

export default characterSheetWrapper
