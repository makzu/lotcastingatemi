import { ListItemIcon, ListItemText } from '@mui/material'
import { Description } from '@mui/icons-material'

import { MenuItemProps as Props } from './CharacterMenuItem'
import LinkMenuItem from './LinkMenuItem'

const CardMenuLinks = ({ id, characterType }: Props) => (
  <LinkMenuItem to={`/${characterType}s/${id}`}>
    <ListItemIcon>
      <Description />
    </ListItemIcon>
    <ListItemText primary="Full Sheet" />
  </LinkMenuItem>
)

export default CardMenuLinks
