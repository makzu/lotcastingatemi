import * as React from 'react'
import DocumentTitle from 'react-document-title'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router'

import { Grid, Paper, Typography } from '@material-ui/core'

import CharacterLoadError from '../CharacterLoadError'

import ProtectedComponent from 'containers/ProtectedComponent'
import { State } from 'ducks'
import { getMeritsForCharacter, getSpecificCharacter } from 'ducks/selectors'
import { Character, Merit } from 'types'
import SingleMerit from './SingleMerit'

interface Props {
  character: Character
  merits: Merit[]
}

const MeritFullPage = (props: Props) => {
  /* Escape hatch */
  if (props.character == null) {
    return (
      <Paper>
        <CharacterLoadError />
      </Paper>
    )
  }

  const mts = props.merits.map(m => (
    <Grid item xs={12} md={6} xl={4} key={m.id}>
      <SingleMerit merit={m} />
    </Grid>
  ))

  return (
    <>
      <DocumentTitle
        title={`${props.character.name} Merits | Lot-Casting Atemi`}
      />

      <Typography variant="h5" gutterBottom>
        Merits
      </Typography>

      <Grid container spacing={24}>
        {mts}
      </Grid>
    </>
  )
}

function mapStateToProps(state: State, ownProps: RouteComponentProps<any>) {
  const id = ownProps.match.params.characterId
  const character = getSpecificCharacter(state, id)
  let merits = []

  if (character != null && character.merits != null) {
    merits = getMeritsForCharacter(state, id)
  }

  return {
    character,
    merits,
  }
}

export default ProtectedComponent(connect(mapStateToProps)(MeritFullPage))
