import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import { useLazyFetch } from 'hooks'
import { compose } from 'recompose'

import ProtectedComponent from '@lca/containers/ProtectedComponent'
import { fetchCharacterIfNecessary } from '@lca/ducks/entities/character'
import type { RouteWithIdProps as RouteProps } from '@lca/types/util'
import CharacterSheet from '../characters/CharacterSheet'
import BioPage from './Bio'
import CharmPage from './Charms'
import MeritPage from './Merits'
import SorceryPage from './Sorcery'

interface Props extends RouteProps {
  fetch: typeof fetchCharacterIfNecessary
}

const characterSheetWrapper = ({ match, fetch }: Props) => {
  const id = parseInt(match.params.id, 10)
  useLazyFetch(id, fetch)

  return (
    <Switch>
      <Route path="/characters/:id/merits" component={MeritPage} />
      <Route path="/characters/:id/charms" component={CharmPage} />
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
