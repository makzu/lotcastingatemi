import { Grid, Typography } from '@mui/material'

import { useCharacterAttribute } from '@/ducks/entities'
import { useDocumentTitle, useIdFromParams } from '@/hooks'
import CharacterLoadError from '../CharacterLoadError'
import SpellList from './SpellList'

const SorceryPage = () => {
  const id = useIdFromParams()
  const name = useCharacterAttribute(id, 'name')
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

      <SpellList />
    </>
  )
}

export default SorceryPage
