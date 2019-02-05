// @flow
import * as React from 'react'
import { Switch, Route } from 'react-router-dom'

import BioEditor from './bio'
import CharacterEditor from './'
import MeritEditor from './merits/MeritEditor'

const CharacterEditorWrapper = () => (
  <Switch>
    <Route
      path="/characters/:characterId/edit/merits"
      component={MeritEditor}
    />
    <Route path="/characters/:characterId/edit/bio" component={BioEditor} />
    <Route path="/characters/:characterId/edit" component={CharacterEditor} />
  </Switch>
)

export default CharacterEditorWrapper
