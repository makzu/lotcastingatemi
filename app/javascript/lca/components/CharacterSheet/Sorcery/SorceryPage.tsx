import { connect } from 'react-redux'

import { Grid, Typography } from '@mui/material'

import BlockPaper from 'components/shared/BlockPaper'
import { State } from 'ducks'
import { getSpecificCharacter, getSpellsForCharacter } from 'ducks/entities'
import { Character, Spell } from 'types'
import { RouteWithIdProps as RouteProps } from 'types/util'
import CharacterLoadError from '../CharacterLoadError'
import SpellList from './SpellList'
import useDocumentTitle from 'hooks/UseDocumentTitle'

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
