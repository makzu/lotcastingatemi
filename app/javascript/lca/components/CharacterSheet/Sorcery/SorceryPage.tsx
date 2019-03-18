import * as React from 'react'
import DocumentTitle from 'react-document-title'
import { connect } from 'react-redux'

import { Grid, Typography } from '@material-ui/core'

import BlockPaper from 'components/generic/blockPaper.jsx'
import { State } from 'ducks'
import { getSpecificCharacter, getSpellsForCharacter } from 'ducks/entities'
import { Character, Spell } from 'types'
import { RouteWithIdProps as RouteProps } from 'types/util'
import CharacterLoadError from '../CharacterLoadError'

interface StateProps {
  character: Character
  spells: Spell[]
}

// interface Props extends StateProps {}

const SorceryPage = ({ character, spells }: StateProps) => {
  /* Escape hatch */
  if (character == null) {
    return <CharacterLoadError />
  }

  return (
    <>
      <DocumentTitle title={`${character.name} Sorcery | Lot-Casting Atemi`} />

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h5">Sorcery</Typography>
        </Grid>

        <Grid item xs={12}>
          <BlockPaper>
            <Typography paragraph>
              {character.name} has {spells.length} spells. Neat!
            </Typography>
          </BlockPaper>
        </Grid>
      </Grid>

      <Typography variant="h5">Spells</Typography>
    </>
  )
}

const mapState = (state: State, { match }: RouteProps): StateProps => {
  const id = parseInt(match.params.id, 10)
  return {
    character: getSpecificCharacter(state, id),
    spells: getSpellsForCharacter(state, id),
  }
}

export default connect(mapState)(SorceryPage)
