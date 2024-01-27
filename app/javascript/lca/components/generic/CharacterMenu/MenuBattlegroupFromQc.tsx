import { GroupAdd } from '@mui/icons-material'
import { ListItemIcon, ListItemText, MenuItem } from '@mui/material/'

import { createBattlegroupFromQc } from '@/ducks/actions'
import { useAppDispatch, useAppSelector } from '@/hooks'
import type { MenuItemProps as Props } from './CharacterMenuItem'

const BattlegroupFromQc = ({ id, characterType }: Props) => {
  const canCreate = useAppSelector(
    (state) => state.session.authenticated && characterType === 'qc',
  )
  const dispatch = useAppDispatch()
  const action = () => {
    dispatch(createBattlegroupFromQc(id))
  }

  if (!canCreate) return null

  return (
    <MenuItem onClick={action}>
      <ListItemIcon>
        <GroupAdd />
      </ListItemIcon>
      <ListItemText primary="Create Battlegroup of QC" />
    </MenuItem>
  )
}

export default BattlegroupFromQc
