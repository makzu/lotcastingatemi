import { Refresh } from '@mui/icons-material'
import { ListItemIcon, ListItemText, MenuItem } from '@mui/material'

import { fetch } from '@/ducks/actions/ByType'
import { useAppDispatch } from '@/hooks'
import type { MenuItemProps as Props } from './CharacterMenuItem'

const CardMenuRefresh = ({ characterType, id }: Props) => {
  const dispatch = useAppDispatch()
  const action = () => {
    dispatch(fetch[characterType](id))
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
