import { Route, Switch } from 'react-router-dom'

import ProtectedComponent from 'containers/ProtectedComponent'
import { fetchCharacterIfNecessary } from 'ducks/entities/character'
import { useAppDispatch, useIdFromParams } from 'hooks'
import CharacterSheet from '../characters/CharacterSheet'
import CharmFullPage from '../characters/charms/'
import BioPage from './Bio'
import MeritPage from './Merits'
import SorceryPage from './Sorcery'

const characterSheetWrapper = () => {
  const id = useIdFromParams()
  const dispatch = useAppDispatch()
  dispatch(fetchCharacterIfNecessary(id))

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

export default ProtectedComponent(characterSheetWrapper)
