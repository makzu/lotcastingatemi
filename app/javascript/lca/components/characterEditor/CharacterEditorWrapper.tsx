import { Route, Switch } from 'react-router-dom'

import BioEditor from './bio.tsx'
import CharmEditor from './charms/index.tsx'
import CharacterEditor from './index.tsx'
import MeritEditor from './merits/MeritEditor.tsx'

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
