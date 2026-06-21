import { ListItemIcon, ListItemText, MenuItem } from '@material-ui/core'
import { Refresh } from '@material-ui/icons'

import { fetch } from '@lca/ducks/actions/ByType.ts'
import useAppDispatch from '@lca/hooks/UseAppDispatch.ts'
import type { MenuItemProps as Props } from './CharacterMenuItem.ts'

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
