import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import { compose } from 'recompose'

import ProtectedComponent from '@lca/containers/ProtectedComponent.tsx'
import { fetchCharacterIfNecessary } from '@lca/ducks/entities/character.ts'
import { useLazyFetch } from '@lca/hooks/index.ts'
import type { RouteWithIdProps as RouteProps } from '@lca/types/util.ts'
import CharacterSheet from '../characters/CharacterSheet.tsx'
import BioPage from './Bio/index.tsx'
import CharmPage from './Charms/index.tsx'
import MeritPage from './Merits/index.tsx'
import SorceryPage from './Sorcery/index.tsx'

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
