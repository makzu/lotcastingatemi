import { useState } from 'react'
import { SortableContainer } from 'react-sortable-hoc'

import ContentAddCircle from '@mui/icons-material/AddCircle'
import { Button, Divider, Typography } from '@mui/material'

import BlockPaper from '@/components/shared/BlockPaper'
import WeaponEditorPopup from './WeaponEditorPopup'
import WeaponRow from './WeaponRow'
import SortableItem from '@/components/generic/SortableItem'
import { createWeapon, updateWeapon } from '@/ducks/actions'
import { getWeaponsForCharacter } from '@/ducks/entities'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { updateWeaponSort } from 'ducks/entities/weapon'
import type { Character } from '@/types'

// @ts-expect-error TODO migrate to new dnd lib
const SortableWeaponList = SortableContainer(({ items }) => <div>{items}</div>)

interface WeaponEditorProps {
  character: Character
}

interface SortFnProps {
  oldIndex: number
  newIndex: number
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

  const handleSort = ({ oldIndex, newIndex }: SortFnProps) => {
    const weaponA = weapons[oldIndex]!
    const weaponB = weapons[newIndex]!
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
      {i !== weapons.length - 1 ? <Divider /> : <></>}
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
          useDragHandle
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
