import { connect } from 'react-redux'
import { Grid, Typography } from '@material-ui/core'
import type { Spell } from 'types'

import type { RootState } from '@lca/store'
import BlockPaper from 'components/generic/blockPaper.jsx'
import { getSpellsForCharacter } from 'ducks/entities'
import SpellDisplay from './SpellDisplay'

interface StateProps {
  spells: Spell[]
}
interface OuterProps {
  characterId: number
}
// interface Props extends StateProps {}

const mapSpells = (s) => (
  <Grid item key={s.id}>
    <BlockPaper />
  </Grid>
)

const SpellList = ({ spells }: StateProps) => {
  const spellList = spells.map((spell) => (
    <Grid item xs={12} md={6} xl={4} key={spell.id}>
      <SpellDisplay spell={spell} />
    </Grid>
  ))
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h5">Spells</Typography>
      </Grid>

      {spellList}
    </Grid>
  )
}

const mapState = (
  state: RootState,
  { characterId }: OuterProps,
): StateProps => {
  return {
    spells: getSpellsForCharacter(state, characterId),
  }
}

export default connect(mapState)(SpellList)
