import { useState } from 'react'
import { SortableContainer, SortableElement } from 'react-sortable-hoc'
import { Button, Divider, Typography } from '@material-ui/core'
import ContentAddCircle from '@material-ui/icons/AddCircle'

import BlockPaper from '@lca/components/generic/BlockPaper.tsx'
import { createWeapon, updateWeapon } from '@lca/ducks/actions/index.ts'
import { getWeaponsForCharacter } from '@lca/ducks/entities/index.ts'
import { updateWeaponSort } from '@lca/ducks/entities/weapon.ts'
import { useAppDispatch } from '@lca/hooks/UseAppDispatch.ts'
import { useAppSelector } from '@lca/hooks/UseAppSelector.ts'
import type { Character } from '@lca/types/index.ts'
import WeaponEditorPopup from './WeaponEditorPopup.tsx'
import WeaponRow from './WeaponRow.tsx'

const SortableItem = SortableElement(({ children }) => children)
const SortableWeaponList = SortableContainer(({ items }) => <div>{items}</div>)

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

  const handleSort = ({ oldIndex, newIndex }) => {
    const weaponA = weapons[oldIndex]
    const weaponB = weapons[newIndex]
    const offset = newIndex > oldIndex ? 1 : -1
    dispatch(
      updateWeaponSort({ id: weaponA.id, sorting: weaponB.sorting + offset }),
    )
    dispatch(
      updateWeapon(weaponA.id, character.id, {
        sorting_position: newIndex,
      }),
    )
  }

  const WeaponElements = weapons.map((weapon, i) => (
    <SortableItem key={weapon.id} index={i}>
      <WeaponRow
        weapon={weapon}
        character={character}
        setId={setSelectedWeaponId}
      />
      {i !== weapons.length - 1 && <Divider />}
    </SortableItem>
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

        <SortableWeaponList
          items={WeaponElements}
          onSortEnd={handleSort}
          useDragHandle={true}
        />
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
