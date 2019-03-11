// @flow
import * as React from 'react'
import { connect } from 'react-redux'
import { RouteComponentProps as RouteProps } from 'react-router'
import { Switch, Route } from 'react-router-dom'

import { fetchCharacterIfNecessary } from 'ducks/entities/character'
import { useLazyFetch } from 'hooks'
import BioFullPage from './BioFullPage'
import CharmFullPage from './charms/'
import CharacterSheet from './CharacterSheet'
import MeritFullPage from './MeritFullPage'

interface Props extends RouteProps {
  fetch: typeof fetchCharacterIfNecessary;
}

const characterSheetWrapper = ({ match, fetch }: Props) => {
  const { characterId } = match.params
  useLazyFetch(characterId, fetch)

  return (
    <Switch>
      <Route path="/characters/:characterId/merits" component={MeritFullPage} />
      <Route path="/characters/:characterId/charms" component={CharmFullPage} />
      <Route path="/characters/:characterId/bio" component={BioFullPage} />
      <Route path="/characters/:characterId" component={CharacterSheet} />
    </Switch>
  )
}

export default connect(
  null,
  { fetch: fetchCharacterIfNecessary }
)(characterSheetWrapper)
