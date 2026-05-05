import { ListItemIcon, ListItemText, MenuItem } from '@material-ui/core/'
import { GroupAdd } from '@material-ui/icons'

import { createBattlegroupFromQc } from '@lca/ducks/actions'
import { useAppDispatch, useAppSelector } from '@lca/hooks'
import type { MenuItemProps as Props } from './CharacterMenuItem'

const BattlegroupFromQc = ({ characterType, id }: Props) => {
  const dispatch = useAppDispatch()
  const canCreate = useAppSelector(
    (state) => state.session.authenticated && characterType === 'qc',
  )

  if (!canCreate) return null

  return (
    <MenuItem button onClick={() => dispatch(createBattlegroupFromQc(id))}>
      <ListItemIcon>
        <GroupAdd />
      </ListItemIcon>
      <ListItemText primary="Create Battlegroup of QC" />
    </MenuItem>
  )
}

export default BattlegroupFromQc
