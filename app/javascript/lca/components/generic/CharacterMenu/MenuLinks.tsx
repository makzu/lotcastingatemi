import { Description } from '@mui/icons-material'
import { ListItemIcon, ListItemText, MenuItem } from '@mui/material'

import { Link } from 'react-router-dom'
import type { MenuItemProps as Props } from './CharacterMenuItem'

const CardMenuLinks = ({ id, characterType }: Props) => (
  <MenuItem component={Link} to={`/${characterType}s/${id}`}>
    <ListItemIcon>
      <Description />
    </ListItemIcon>
    <ListItemText primary="Full Sheet" />
  </MenuItem>
)

export default CardMenuLinks
