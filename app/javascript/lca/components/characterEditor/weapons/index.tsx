import { type ReactNode, useState } from 'react'
import { DragDropProvider } from '@dnd-kit/react'
import { isSortable, useSortable } from '@dnd-kit/react/sortable'
import { Button, Divider, Typography } from '@material-ui/core'
import ContentAddCircle from '@material-ui/icons/AddCircle'

import BlockPaper from '@lca/components/generic/BlockPaper.tsx'
import { createWeapon, updateWeapon } from '@lca/ducks/actions/index.ts'
import { getWeaponsForCharacter } from '@lca/ducks/entities/index.ts'
import { useAppDispatch } from '@lca/hooks/UseAppDispatch.ts'
import { useAppSelector } from '@lca/hooks/UseAppSelector.ts'
import type { Character } from '@lca/types/index.ts'
import WeaponEditorPopup from './WeaponEditorPopup.tsx'
import WeaponRow from './WeaponRow.tsx'

interface SortableProps {
  id: number
  index: number
  children: ReactNode
}
const Sortable = ({ id, index, children }: SortableProps) => {
  const { ref } = useSortable({ id, index })

  return <div ref={ref}>{children}</div>
}

interface WeaponEditorProps {
  character: Character
}
const WeaponEditor = (props: WeaponEditorProps) => {
  const [selectedWeaponId, setSelectedWeaponId] = useState<number | null>(null)

  const { character } = props
  const weapons = useAppSelector((state) =>
    getWeaponsForCharacter(state, character.id),
  )

  const dispatch = useAppDispatch()
  const onClickCreateWeapon = () => {
    dispatch(createWeapon(character.id))
  }

  const WeaponElements = weapons.map((weapon, i) => (
    <Sortable id={weapon.id} key={weapon.id} index={i}>
      <WeaponRow
        weapon={weapon}
        character={character}
        setId={setSelectedWeaponId}
      />
      {i !== weapons.length - 1 && <Divider />}
    </Sortable>
  ))
  return (
    <>
      <BlockPaper>
        <Typography variant="h6">
          Weapons
          <Button onClick={onClickCreateWeapon}>
            Add
            <ContentAddCircle />
          </Button>
        </Typography>

        <DragDropProvider
          onDragEnd={(event) => {
            const { source } = event.operation

            if (isSortable(source)) {
              if (source.index === source.initialIndex) {
                return
              }

              dispatch(
                updateWeapon(source.id as number, character.id, {
                  sorting_position: source.index,
                }),
              )
            }
          }}
        >
          {WeaponElements}
        </DragDropProvider>
      </BlockPaper>

      <WeaponEditorPopup
        character={character}
        openWeapon={selectedWeaponId}
        setId={setSelectedWeaponId}
      />
    </>
  )
}

export default WeaponEditor
