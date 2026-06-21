import { ListItemIcon, ListItemText, MenuItem } from '@material-ui/core'
import { PersonAdd } from '@material-ui/icons'

import { duplicate } from '@lca/ducks/actions/ByType.ts'
import { useAppDispatch, useAppSelector } from '@lca/hooks/index.ts'
import type { MenuItemProps as Props } from './CharacterMenuItem.ts'

const DuplicateButton = ({ characterType, id }: Props) => {
  const canDupe = useAppSelector((state) => state.session.authenticated)
  const dispatch = useAppDispatch()

  if (!canDupe) return null

  return (
    <MenuItem button onClick={() => dispatch(duplicate[characterType](id))}>
      <ListItemIcon>
        <PersonAdd />
      </ListItemIcon>
      <ListItemText primary="Duplicate" />
    </MenuItem>
  )
}

export default DuplicateButton
