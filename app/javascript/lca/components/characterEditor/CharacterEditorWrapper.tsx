import { Route, Switch } from 'react-router-dom'

import CharacterEditor from './'
import BioEditor from './bio'
import CharmEditor from './charms'
import MeritEditor from './merits/MeritEditor'

const CharacterEditorWrapper = () => (
  <Switch>
    <Route path="/characters/:id/edit/charms" component={CharmEditor} />
    <Route
      path="/characters/:characterId/edit/merits"
      component={MeritEditor}
    />
    <Route path="/characters/:characterId/edit/bio" component={BioEditor} />
    <Route path="/characters/:characterId/edit" component={CharacterEditor} />
  </Switch>
)

export default CharacterEditorWrapper
