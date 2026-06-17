import { useState } from 'react'
import { DragDropProvider } from '@dnd-kit/react'
import { Grid } from '@material-ui/core'

import {
  type CharmFilter,
  filterCharms,
} from '@lca/components/CharacterSheet/Charms/useCharmFilters'
import { getCharmsForCharacterByType } from '@lca/ducks/entities'
import useAppSelector from '@lca/hooks/UseAppSelector'
import type { Character, Charm } from '@lca/types'
import CharmFields from './CharmFields.tsx'

interface ExposedProps {
  character: Character
  type: 'evocation' | 'martialArts' | 'native' | 'spirit'
  filters: CharmFilter
}

const CharmList = (props: ExposedProps) => {
  const { character, type, filters } = props
  const [openCharm, setOpenCharm] = useState<Charm['id']>(0)

  const charms = useAppSelector((state) =>
    getCharmsForCharacterByType[type](state, character.id),
  )

  const filteredCharms = filterCharms(charms, filters, type) as Charm[]

  const mappedCharms = filteredCharms.map((c) => (
    <Grid item xs={12} md={6} xl={4} key={c.id}>
      <CharmFields
        character={character}
        charm={c}
        isOpen={openCharm === c.id}
        setOpenCharm={setOpenCharm}
        type={type}
      />
    </Grid>
  ))

  return <DragDropProvider>{mappedCharms}</DragDropProvider>
}

export default CharmList
