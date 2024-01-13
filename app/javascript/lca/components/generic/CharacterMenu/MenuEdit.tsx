import { Link } from 'react-router-dom'

import Edit from '@mui/icons-material/Edit'
import { ListItemIcon, ListItemText, MenuItem } from '@mui/material'

import { useAppSelector } from 'hooks'
import { canIEdit } from '@/selectors'
import { MenuItemProps as Props } from './CharacterMenuItem'

const CardMenuEdit = ({ id, characterType }: Props) => {
  const canEdit = useAppSelector((state) => canIEdit(state, id, characterType))
  if (!canEdit) return null
  return (
    <MenuItem component={Link} to={`/${characterType}s/${id}/edit`}>
      <ListItemIcon>
        <Edit />
      </ListItemIcon>
      <ListItemText inset primary="Edit" />
    </MenuItem>
  )
}

export default CardMenuEdit
