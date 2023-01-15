import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import { compose } from 'recompose'

import ProtectedComponent from 'containers/ProtectedComponent'
import { fetchCharacterIfNecessary } from 'ducks/entities/character'
import { useLazyFetch } from 'hooks'
import { RouteWithIdProps as RouteProps } from 'types/util'
import CharacterSheet from '../characters/CharacterSheet'
import CharmFullPage from '../characters/charms/'
import BioPage from './Bio'
import CharmPage from './Charms'
import MeritPage from './Merits'
import SorceryPage from './Sorcery'

interface Props extends RouteProps {
  fetch: typeof fetchCharacterIfNecessary
}

const characterSheetWrapper = ({ match, fetch }: Props) => {
  const id = parseInt(match.params.id, 10)
  // tslint:disable:react-hooks-nesting
  useLazyFetch(id, fetch)

  return (
    <Switch>
      <Route path="/characters/:id/merits" component={MeritPage} />
      <Route path="/characters/:characterId/charms" component={CharmFullPage} />
      <Route path="/characters/:id/charmss" component={CharmPage} />
      <Route path="/characters/:id/sorcery" component={SorceryPage} />
      <Route path="/characters/:id/bio" component={BioPage} />
      <Route path="/characters/:characterId" component={CharacterSheet} />
    </Switch>
  )
}

export default compose<Props, RouteProps>(
  connect(null, { fetch: fetchCharacterIfNecessary }),
  ProtectedComponent,
)(characterSheetWrapper)
