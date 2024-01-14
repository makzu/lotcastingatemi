import { NavLink, type NavLinkProps } from 'react-router-dom'

import { type ListItemButtonProps } from '@mui/material/ListItemButton';

import { ListItemButton } from '@mui/material';

const NavLinkListItem = (props: ListItemButtonProps & NavLinkProps) => (
  <ListItemButton component={NavLink} {...props} />
)

export default NavLinkListItem
