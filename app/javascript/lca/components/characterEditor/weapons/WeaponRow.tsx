import { Box, IconButton } from '@material-ui/core'
import { Edit, RemoveCircle } from '@material-ui/icons'

import WeaponLine from '@lca/components/characters/weapons/WeaponLine.tsx'
import Handle from '@lca/components/shared/GrabHandle'
import { destroyWeapon } from '@lca/ducks/actions'
import { useAppDispatch } from '@lca/hooks/UseAppDispatch'
import type { Character, Weapon } from '@lca/types'

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
