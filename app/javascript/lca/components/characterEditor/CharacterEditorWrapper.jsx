// @flow
import { Switch, Route } from 'react-router-dom'

import BioEditor from './bio'
import CharacterEditor from './'
import MeritEditor from './merits/MeritEditor'

const CharacterEditorWrapper = () => (
  <Switch>
    <Route path="/characters/:characterId/edit/merits">
      <MeritEditor />
    </Route>
    <Route path="/characters/:characterId/edit/bio">
      <BioEditor />
    </Route>
    <Route path="/characters/:characterId/edit">
      <CharacterEditor />
    </Route>
  </Switch>
)

export default CharacterEditorWrapper
