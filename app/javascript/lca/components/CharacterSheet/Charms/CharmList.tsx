import { useState } from 'react'
import { Grid } from '@material-ui/core'

import { getCharmsForCharacterByType } from '@lca/ducks/entities'
import useAppSelector from '@lca/hooks/UseAppSelector'
import type { Character, Charm } from '@lca/types'
import FullCharmDisplay from './CharmDisplay/FullCharm.tsx'
import { type CharmFilter, filterCharms } from './useCharmFilters'

interface ExposedProps {
  id: Character['id']
  type: 'evocation' | 'martialArts' | 'native' | 'spirit'
  filters: CharmFilter
}

const CharmList = (props: ExposedProps) => {
  const [openCharm, setOpenCharm] = useState<Charm['id']>(0)
  const charms = useAppSelector((state) =>
    getCharmsForCharacterByType[props.type](state, props.id),
  )
  const filteredCharms = filterCharms(
    charms,
    props.filters,
    props.type,
  ) as Charm[]
  const mappedCharms = filteredCharms.map((c: Charm) => (
    <Grid item xs={12} md={6} xl={4} key={c.id}>
      <FullCharmDisplay
        charm={c}
        isOpen={openCharm === c.id}
        setOpenCharm={setOpenCharm}
      />
    </Grid>
  ))

  return <>{mappedCharms}</>
}

export default CharmList
