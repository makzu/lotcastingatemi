import * as React from 'react'
import { connect } from 'react-redux'
import { RouteComponentProps as RouteProps } from 'react-router'
import { Route, Switch } from 'react-router-dom'

import { fetchCharacterIfNecessary } from 'ducks/entities/character'
import { useLazyFetch } from 'hooks'
import CharacterSheet from '../characters/CharacterSheet'
import CharmFullPage from '../characters/charms/'
import BioPage from './Bio'
import MeritPage from './Merits'

interface Props extends RouteProps {
  fetch: typeof fetchCharacterIfNecessary
}

const characterSheetWrapper = ({ match, fetch }: Props) => {
  useLazyFetch(match.params.characterId, fetch)

  return (
    <Switch>
      <Route path="/characters/:characterId/merits" component={MeritPage} />
      <Route path="/characters/:characterId/charms" component={CharmFullPage} />
      <Route path="/characters/:characterId/bio" component={BioPage} />
      <Route path="/characters/:characterId" component={CharacterSheet} />
    </Switch>
  )
}

export default connect(
  null,
  { fetch: fetchCharacterIfNecessary }
)(characterSheetWrapper)
