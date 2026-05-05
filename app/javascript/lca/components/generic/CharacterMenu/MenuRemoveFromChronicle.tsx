import {
  Divider,
  ListItemIcon,
  ListItemText,
  MenuItem,
} from '@material-ui/core'
import RemoveCircle from '@material-ui/icons/RemoveCircle'

import { removeThingFromChronicle as removeThing } from '@lca/ducks/actions'
import { useAppDispatch, useAppSelector } from '@lca/hooks'
import { canIEdit } from '@lca/selectors'
import type { MenuItemProps as Props } from './CharacterMenuItem'

const CardMenuRemove = ({ id, characterType }: Props) => {
  const dispatch = useAppDispatch()
  const canEdit = useAppSelector((state) => canIEdit(state, id, characterType))
  const chronId = useAppSelector(
    (state) => state.entities.current[`${characterType}s`][id]?.chronicle_id,
  )

  if (!canEdit || !chronId) return null

  return (
    <>
      <Divider />
      <MenuItem
        button
        onClick={() => dispatch(removeThing(chronId, id, characterType))}
      >
        <ListItemIcon>
          <RemoveCircle />
        </ListItemIcon>
        <ListItemText inset primary="Remove from Chronicle" />
      </MenuItem>
    </>
  )
}

export default CardMenuRemove
