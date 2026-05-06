import { connect } from 'react-redux'
import { Grid, Typography } from '@material-ui/core'
import type { State } from 'ducks'

import { useDocumentTitle } from '@lca/hooks'
import { getSpecificCharacter } from 'ducks/entities'
import CharacterLoadError from '../CharacterLoadError'
import SpellList from './SpellList'
import type { RouteWithIdProps as RouteProps } from 'types/util'

interface StateProps {
  id: number
  name: string
}

// interface Props extends StateProps {}

const SorceryPage = ({ id, name }: StateProps) => {
  useDocumentTitle(`${name} Sorcery | Lot-Casting Atemi`)

  /* Escape hatch */
  if (name == null) {
    return <CharacterLoadError />
  }

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h5">Sorcery</Typography>
        </Grid>
      </Grid>

      <SpellList characterId={id} />
    </>
  )
}

const mapState = (state: State, { match }: RouteProps): StateProps => {
  const id = parseInt(match.params.id, 10)
  return {
    id,
    name: (getSpecificCharacter(state, id) || ({} as any)).name,
  }
}

export default connect(mapState)(SorceryPage)
