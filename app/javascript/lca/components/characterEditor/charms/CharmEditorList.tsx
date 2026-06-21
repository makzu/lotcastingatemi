import { type ReactNode, useState } from 'react'
import { DragDropProvider } from '@dnd-kit/react'
import { isSortable, useSortable } from '@dnd-kit/react/sortable'
import { Grid } from '@material-ui/core'

import {
  type CharmFilter,
  filterCharms,
} from '@lca/components/CharacterSheet/Charms/useCharmFilters.ts'
import {
  getCharmsForCharacterByType,
  updateCharm,
} from '@lca/ducks/entities/index.ts'
import useAppDispatch from '@lca/hooks/UseAppDispatch.ts'
import useAppSelector from '@lca/hooks/UseAppSelector.ts'
import type { Character, Charm } from '@lca/types/index.ts'
import CharmFields from './CharmFields.tsx'

interface ExposedProps {
  character: Character
  type: 'evocation' | 'martialArts' | 'native' | 'spirit'
  filters: CharmFilter
}

interface SortableProps {
  id: number
  index: number
  children: ReactNode
}
function Sortable({ id, index, children }: SortableProps) {
  const { ref } = useSortable({ id, index })

  return (
    <Grid item ref={ref} xs={12} md={6} xl={4}>
      {children}
    </Grid>
  )
}

const CharmList = (props: ExposedProps) => {
  const dispatch = useAppDispatch()
  const { character, type, filters } = props
  const [openCharm, setOpenCharm] = useState<Charm['id']>(0)

  const charms = useAppSelector((state) =>
    getCharmsForCharacterByType[type](state, character.id),
  )

  const filteredCharms = filterCharms(charms, filters, type) as Charm[]

  const mappedCharms = filteredCharms.map((c, i) => (
    <Sortable key={c.id} id={c.id} index={i}>
      <CharmFields
        character={character}
        charm={c}
        isOpen={openCharm === c.id}
        setOpenCharm={setOpenCharm}
        type={type}
      />
    </Sortable>
  ))

  return (
    <DragDropProvider
      onDragEnd={(event) => {
        const { source } = event.operation

        if (isSortable(source)) {
          if (source.index === source.initialIndex) {
            return
          }

          dispatch(
            updateCharm(source.id as number, character.id, {
              sorting_position: source.index,
            }),
          )
        }
      }}
    >
      {mappedCharms}
    </DragDropProvider>
  )
}

export default CharmList
