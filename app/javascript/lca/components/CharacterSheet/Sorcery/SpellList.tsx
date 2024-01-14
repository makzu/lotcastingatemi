import { Grid, Typography } from '@mui/material'

import { getSpellsForCharacter } from '@/ducks/entities'
import { useAppSelector, useIdFromParams } from '@/hooks'
import SpellDisplay from './SpellDisplay'

const SpellList = () => {
  const id = useIdFromParams()
  const spells = useAppSelector((state) => getSpellsForCharacter(state, id))

  const spellList = spells.map((spell) => (
    <Grid item xs={12} md={6} xl={4} key={spell.id}>
      <SpellDisplay spell={spell} />
    </Grid>
  ))
  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h5">Spells</Typography>
        </Grid>

        {spellList}
      </Grid>
    </>
  )
}

export default SpellList
