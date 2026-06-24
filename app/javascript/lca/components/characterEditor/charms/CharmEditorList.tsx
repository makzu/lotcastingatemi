import { useState } from 'react'
import { DragDropProvider } from '@dnd-kit/react'
import { isSortable } from '@dnd-kit/react/sortable'

import {
  type CharmFilter,
  filterCharms,
} from '@lca/components/CharacterSheet/Charms/useCharmFilters.ts'
import SortableGridItem from '@lca/components/shared/wrappers/SortableGridItem.tsx'
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

const CharmList = (props: ExposedProps) => {
  const dispatch = useAppDispatch()
  const { character, type, filters } = props
  const [openCharm, setOpenCharm] = useState<Charm['id']>(0)

  const charms = useAppSelector((state) =>
    getCharmsForCharacterByType[type](state, character.id),
  )

  const filteredCharms = filterCharms(charms, filters, type) as Charm[]

  const mappedCharms = filteredCharms.map((c, i) => (
    <SortableGridItem key={c.id} id={c.id} index={i}>
      <CharmFields
        character={character}
        charm={c}
        isOpen={openCharm === c.id}
        setOpenCharm={setOpenCharm}
        type={type}
      />
    </SortableGridItem>
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
