import { Grid, Paper, Typography } from '@mui/material'

import CharacterLoadError from '../CharacterLoadError'

import ProtectedComponent from '@/containers/ProtectedComponent'
import { getMeritsForCharacter } from '@/ducks/selectors'
import SingleMerit from './SingleMerit'
import { useAppSelector, useDocumentTitle, useIdFromParams } from '@/hooks'
import { useCharacterAttribute } from '@/ducks/entities'

const MeritFullPage = () => {
  const id = useIdFromParams()
  const characterName = useCharacterAttribute(id, 'name')
  useDocumentTitle(`${characterName} Merits | Lot-Casting Atemi`)
  const merits = useAppSelector((state) => getMeritsForCharacter(state, id))

  /* Escape hatch */
  if (characterName == null) {
    return (
      <Paper>
        <CharacterLoadError />
      </Paper>
    )
  }

  const mts = merits.map((m) => (
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

export default ProtectedComponent(MeritFullPage)
