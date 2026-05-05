import { ListItemIcon, ListItemText, MenuItem } from '@material-ui/core'
import { Refresh } from '@material-ui/icons'

import useAppDispatch from '@lca/hooks/UseAppDispatch'
import { fetch } from 'ducks/actions/ByType'
import type { MenuItemProps as Props } from './CharacterMenuItem'

const CardMenuRefresh = ({ characterType, id }: Props) => {
  const dispatch = useAppDispatch()

  return (
    <MenuItem button onClick={() => dispatch(fetch[characterType](id))}>
      <ListItemIcon>
        <Refresh />
      </ListItemIcon>
      <ListItemText primary="Refresh Data" />
    </MenuItem>
  )
}

export default CardMenuRefresh
