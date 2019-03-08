import * as React from 'react'
import { Route, Switch } from 'react-router-dom'

import CharacterSheet from '../characters/CharacterSheet'
import CharmFullPage from '../characters/charms/'
import BioFullPage from './Bio'
import MeritPage from './Merits'

const characterSheetWrapper = () => {
  return (
    <Switch>
      <Route path="/characters/:characterId/merits" component={MeritPage} />
      <Route path="/characters/:characterId/charms" component={CharmFullPage} />
      <Route path="/characters/:characterId/bio" component={BioFullPage} />
      <Route path="/characters/:characterId" component={CharacterSheet} />
    </Switch>
  )
}

export default characterSheetWrapper
