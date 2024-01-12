import { connect } from 'react-redux'

import { Grid } from '@mui/material'
import { State } from 'ducks'
import { getCharmsForCharacterByType } from 'ducks/entities'
import { Charm } from 'types'
import FullCharmDisplay from './CharmDisplay/FullCharm'
import { CharmFilter, filterCharms } from './useCharmFilters'

interface ExposedProps {
  id: number
  type: 'evocation' | 'martialArts' | 'native' | 'spirit'
  filters: CharmFilter
}

const fullViewMap = (c: Charm) => (
  <Grid item xs={12} md={6} key={c.id}>
    <FullCharmDisplay charm={c} />
  </Grid>
)

const CharmList = (props) => {
  const mappedCharms = (
    <Grid container spacing={3}>
      {props.charms.map(fullViewMap)}
    </Grid>
  )
  return <>{mappedCharms}</>
}

const mapState = (state: State, props: ExposedProps) => {
  const getCharms = getCharmsForCharacterByType[props.type] || (() => [])
  const charms = filterCharms(getCharms(state, props.id), props.filters)
  return { charms }
}

export default connect(mapState)(CharmList)
