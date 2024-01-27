import RemoveCircle from '@mui/icons-material/RemoveCircle'
import { Divider, ListItemIcon, ListItemText, MenuItem } from '@mui/material'

import { removeThingFromChronicle as removeThing } from '@/ducks/actions'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { canIEdit, getEntity } from '@/selectors'
import type { MenuItemProps as Props } from './CharacterMenuItem'

const CardMenuRemove = ({ id, characterType }: Props) => {
  const dispatch = useAppDispatch()
  const canEdit = useAppSelector((state) => canIEdit(state, id, characterType))
  const character = useAppSelector((state) =>
    getEntity[characterType](state, id),
  )
  const chronId = character?.chronicle_id

  if (!canEdit) return null
  if (!chronId) return null

  const action = () => {
    dispatch(removeThing(chronId, id, characterType))
  }

  return (
    <>
      <Divider />
      <MenuItem onClick={action}>
        <ListItemIcon>
          <RemoveCircle />
        </ListItemIcon>
        <ListItemText inset primary="Remove from Chronicle" />
      </MenuItem>
    </>
  )
}

export default CardMenuRemove
