import { NavLink } from 'react-router-dom'

import ListItemButton, {
  ListItemButtonProps,
} from '@mui/material/ListItemButton'

const NavLinkListItem = (props: ListItemButtonProps<typeof NavLink>) => (
  <ListItemButton component={NavLink} {...props} />
)

export default NavLinkListItem
