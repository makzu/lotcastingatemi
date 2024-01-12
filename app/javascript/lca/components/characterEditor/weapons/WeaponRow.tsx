import { Box, IconButton } from '@mui/material'
import { Edit, RemoveCircle } from '@mui/icons-material'

import WeaponLine from 'components/characters/weapons/WeaponLine'
import Handle from 'components/shared/GrabHandle'
import { destroyWeapon } from 'ducks/actions'
import { useAppDispatch } from 'hooks'
import { Character, Weapon } from 'types'

interface WeaponRowProps {
  character: Character
  weapon: Weapon
  setId: (id: number) => void
}
const WeaponRow = (props: WeaponRowProps) => {
  const { character, weapon } = props
  const setId = () => props.setId(weapon.id)
  const dispatch = useAppDispatch()

  return (
    <Box display="flex" alignItems="center">
      <Handle />

      <IconButton onClick={setId} size="large">
        <Edit />
      </IconButton>

      <WeaponLine weapon={weapon} />

      <IconButton
        onClick={() => dispatch(destroyWeapon(weapon.id, character.id))}
        size="large"
      >
        <RemoveCircle />
      </IconButton>
    </Box>
  )
}

export default WeaponRow
