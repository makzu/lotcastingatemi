import React from 'react'
import { useDispatch } from 'react-redux'

import { Box, IconButton, Theme } from '@material-ui/core'
import { Edit, RemoveCircle } from '@material-ui/icons'

import WeaponLine from 'components/characters/weapons/WeaponLine.jsx'
import Handle from 'components/shared/GrabHandle'
import { destroyWeapon } from 'ducks/actions'
import { Character, Weapon } from 'types'

interface WeaponRowProps {
  character: Character
  weapon: Weapon
  setId: (id: number) => void
}
const WeaponRow = (props: WeaponRowProps) => {
  const { character, weapon } = props
  const setId = () => props.setId(weapon.id)
  const dispatch = useDispatch()

  return (
    <Box display="flex" alignItems="center">
      <Handle />

      <IconButton onClick={setId}>
        <Edit />
      </IconButton>

      <WeaponLine weapon={weapon} />

      <IconButton
        onClick={() => dispatch(destroyWeapon(weapon.id, character.id))}
      >
        <RemoveCircle />
      </IconButton>
    </Box>
  )
}

export default WeaponRow
