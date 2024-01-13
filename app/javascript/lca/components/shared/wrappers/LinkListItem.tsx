import { Link, LinkProps } from 'react-router-dom'

import { ListItemButton, ListItemButtonProps } from '@mui/material'

const LinkListItem = (props: ListItemButtonProps & LinkProps) => (
  <ListItemButton component={Link} {...props} />
)

export default LinkListItem
