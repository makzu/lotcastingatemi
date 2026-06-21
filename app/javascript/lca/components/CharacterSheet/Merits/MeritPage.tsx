import { connect } from 'react-redux'
import { Grid, Paper, Typography } from '@material-ui/core'

import ProtectedComponent from '@lca/containers/ProtectedComponent'
import type { State } from '@lca/ducks'
import {
  getMeritsForCharacter,
  getSpecificCharacter,
} from '@lca/ducks/selectors'
import { useDocumentTitle } from '@lca/hooks'
import type { Character, Merit } from '@lca/types'
import type { RouteWithIdProps as RouteProps } from '@lca/types/util'
import CharacterLoadError from '../CharacterLoadError'
import SingleMerit from './SingleMerit'

interface Props {
  character: Character
  merits: Merit[]
}

const MeritFullPage = (props: Props) => {
  useDocumentTitle(`${props.character.name} Merits | Lot-Casting Atemi`)
  /* Escape hatch */
  if (props.character == null) {
    return (
      <Paper>
        <CharacterLoadError />
      </Paper>
    )
  }

  const mts = props.merits.map((m) => (
    <Grid item xs={12} md={6} xl={4} key={m.id}>
      <SingleMerit merit={m} />
    </Grid>
  ))

  return (
    <>
      <Typography variant="h5" gutterBottom>
        Merits
      </Typography>

      <Grid container spacing={3}>
        {mts}
      </Grid>
    </>
  )
}

function mapStateToProps(state: State, { match }: RouteProps) {
  const id = parseInt(match.params.id, 10)

  return {
    character: getSpecificCharacter(state, id),
    merits: getMeritsForCharacter(state, id),
  }
}

export default ProtectedComponent(connect(mapStateToProps)(MeritFullPage))
