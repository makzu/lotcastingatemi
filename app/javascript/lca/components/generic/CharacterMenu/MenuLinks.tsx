import { ListItemIcon, ListItemText } from '@material-ui/core'
import { Description } from '@material-ui/icons'

import type { MenuItemProps as Props } from './CharacterMenuItem.ts'
import LinkMenuItem from './LinkMenuItem.tsx'

const CardMenuLinks = ({ id, characterType }: Props) => (
  <LinkMenuItem to={`/${characterType}s/${id}`}>
    <ListItemIcon>
      <Description />
    </ListItemIcon>
    <ListItemText primary="Full Sheet" />
  </LinkMenuItem>
)

export default CardMenuLinks
