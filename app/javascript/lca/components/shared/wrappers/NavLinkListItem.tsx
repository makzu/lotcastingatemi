import { NavLink, NavLinkProps } from 'react-router-dom'

import ListItemButton, {
  ListItemButtonProps,
} from '@mui/material/ListItemButton'

const NavLinkListItem = (props: ListItemButtonProps & NavLinkProps) => (
  <ListItemButton component={NavLink} {...props} />
)

export default NavLinkListItem
