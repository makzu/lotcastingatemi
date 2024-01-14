import { NavLink, type NavLinkProps } from 'react-router-dom'

import ListItemButton, {
  type ListItemButtonProps,
} from '@mui/material/ListItemButton'

const NavLinkListItem = (props: ListItemButtonProps & NavLinkProps) => (
  <ListItemButton component={NavLink} {...props} />
)

export default NavLinkListItem
