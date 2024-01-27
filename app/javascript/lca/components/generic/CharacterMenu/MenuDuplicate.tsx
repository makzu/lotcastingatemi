import { PersonAdd } from '@mui/icons-material'
import { ListItemIcon, ListItemText, MenuItem } from '@mui/material'

import { duplicate } from '@/ducks/actions/ByType'
import { useAppDispatch, useAppSelector } from '@/hooks'
import type { MenuItemProps as Props } from './CharacterMenuItem'

const DuplicateButton = ({ characterType, id }: Props) => {
  const canDupe = useAppSelector((state) => state.session.authenticated)
  const dispatch = useAppDispatch()
  if (!canDupe) return null

  const dupe = () => {
    dispatch(duplicate[characterType](id))
  }

  return (
    <MenuItem onClick={dupe}>
      <ListItemIcon>
        <PersonAdd />
      </ListItemIcon>
      <ListItemText primary="Duplicate" />
    </MenuItem>
  )
}

export default DuplicateButton
