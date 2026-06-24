import { Box, IconButton } from '@material-ui/core'
import { DragHandle, Edit, RemoveCircle } from '@material-ui/icons'

import WeaponLine from '@lca/components/characters/weapons/WeaponLine.tsx'
import { destroyWeapon } from '@lca/ducks/actions/index.ts'
import { useAppDispatch } from '@lca/hooks/UseAppDispatch.ts'
import type { Character, Weapon } from '@lca/types/index.ts'

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
    <Box style={{ display: 'flex', alignItems: 'center' }}>
      <div style={{}}>
        <DragHandle />
      </div>

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
