import { Refresh } from '@mui/icons-material'
import { ListItemIcon, ListItemText, MenuItem } from '@mui/material'

import { emptySplitApi } from '@/features/api'
import { useAppDispatch } from '@/hooks'
import type { MenuItemProps as Props } from './CharacterMenuItem'

const CardMenuRefresh = ({ characterType, id }: Props) => {
  const dispatch = useAppDispatch()
  const action = () => {
    dispatch(emptySplitApi.util.invalidateTags([{ type: characterType, id }]))
  }

  return (
    <MenuItem onClick={action}>
      <ListItemIcon>
        <Refresh />
      </ListItemIcon>
      <ListItemText primary="Refresh Data" />
    </MenuItem>
  )
}

export default CardMenuRefresh
