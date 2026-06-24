import { useState } from 'react'
import { DragDropProvider } from '@dnd-kit/react'
import { isSortable } from '@dnd-kit/react/sortable'

import {
  type CharmFilter,
  filterCharms,
} from '@lca/components/CharacterSheet/Charms/useCharmFilters.ts'
import SortableGridItem from '@lca/components/shared/wrappers/SortableGridItem.tsx'
import {
  getSpellsForCharacter,
  updateSpell,
} from '@lca/ducks/entities/index.ts'
import useAppDispatch from '@lca/hooks/UseAppDispatch.ts'
import useAppSelector from '@lca/hooks/UseAppSelector.ts'
import type { Character, Spell } from '@lca/types/index.ts'
import SpellFields from './SpellFields.tsx'

interface ExposedProps {
  character: Character
  filters: CharmFilter
}

const SpellList = (props: ExposedProps) => {
  const dispatch = useAppDispatch()
  const { character, filters } = props
  const [openSpell, setOpenSpell] = useState<Spell['id']>(0)
  const spells = useAppSelector((state) =>
    getSpellsForCharacter(state, character.id),
  )
  const filteredSpells = filterCharms(spells, filters, 'spell') as Spell[]
  const mappedSpells = filteredSpells.map((s, i) => (
    <SortableGridItem key={s.id} id={s.id} index={i}>
      <SpellFields
        character={character}
        spell={s}
        isOpen={openSpell === s.id}
        setOpenSpell={setOpenSpell}
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
            updateSpell(source.id as number, character.id, {
              sorting_position: source.index,
            }),
          )
        }
      }}
    >
      {mappedSpells}
    </DragDropProvider>
  )
}

export default SpellList
