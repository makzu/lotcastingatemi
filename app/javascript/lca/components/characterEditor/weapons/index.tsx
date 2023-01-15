import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SortableContainer, SortableElement } from 'react-sortable-hoc'

import { Button, Divider, Typography } from '@material-ui/core'
import ContentAddCircle from '@material-ui/icons/AddCircle'

import BlockPaper from 'components/generic/blockPaper.jsx'
import { State } from 'ducks'
import { createWeapon, updateWeapon } from 'ducks/actions'
import { getWeaponsForCharacter } from 'ducks/entities'
import { Character } from 'types'
import WeaponEditorPopup from './WeaponEditorPopup'
import WeaponRow from './WeaponRow'

const SortableItem = SortableElement(({ children }) => children)
const SortableWeaponList = SortableContainer(({ items }) => <div>{items}</div>)

interface WeaponEditorProps {
  character: Character
}

const WeaponEditor = (props: WeaponEditorProps) => {
  const [selectedWeaponId, setSelectedWeaponId] = useState<number | null>(null)

  const { character } = props
  const weapons = useSelector((state: State) =>
    getWeaponsForCharacter(state, character.id),
  )

  const dispatch = useDispatch()
  const onClickCreateWeapon = () => {
    dispatch(createWeapon(character.id))
  }

  const handleSort = ({ oldIndex, newIndex }) => {
    const weaponA = weapons[oldIndex]
    const weaponB = weapons[newIndex]
    const offset = weaponA.sort_order > weaponB.sort_order ? -1 : 1
    dispatch(
      updateWeapon(weaponA.id, character.id, {
        sort_order: weaponB.sort_order + offset,
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
