import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import { compose } from 'recompose'

import ProtectedComponent from 'containers/ProtectedComponent'
import { fetchCharacterIfNecessary } from 'ducks/entities/character'
import { useAppDispatch, useIdFromParams, useLazyFetch } from 'hooks'
import { RouteWithIdProps as RouteProps } from 'types/util'
import CharacterSheet from '../characters/CharacterSheet'
import CharmFullPage from '../characters/charms/'
import BioPage from './Bio'
import CharmPage from './Charms'
import MeritPage from './Merits'
import SorceryPage from './Sorcery'

const characterSheetWrapper = () => {
  const id = useIdFromParams()
  // tslint:disable:react-hooks-nesting
  const dispatch = useAppDispatch()
  const fetch = dispatch(fetchCharacterIfNecessary)
  useLazyFetch(id, fetch)

  return (
    <Switch>
      <Route path="/characters/:id/merits">
        <MeritPage />
      </Route>
      <Route path="/characters/:id/charms">
        <CharmFullPage />
      </Route>
      {/* <Route path="/characters/:id/charmss">
        <CharmPage />
      </Route> */}
      <Route path="/characters/:id/sorcery">
        <SorceryPage />
      </Route>
      <Route path="/characters/:id/bio">
        <BioPage />
      </Route>
      <Route path="/characters/:id">
        <CharacterSheet />
      </Route>
    </Switch>
  )
}

export default compose<Props, RouteProps>(
  connect(null, { fetch: fetchCharacterIfNecessary }),
  ProtectedComponent,
)(characterSheetWrapper)
