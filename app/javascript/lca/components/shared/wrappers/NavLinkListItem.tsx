import { ListItemButton } from '@mui/material'
import type { ListItemButtonProps } from '@mui/material/ListItemButton'
import { NavLink, type NavLinkProps } from 'react-router-dom'

const NavLinkListItem = (props: ListItemButtonProps & NavLinkProps) => (
  <ListItemButton component={NavLink} {...props} />
)

export default NavLinkListItem
