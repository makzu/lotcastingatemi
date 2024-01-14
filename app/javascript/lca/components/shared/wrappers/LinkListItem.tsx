import { Link, type LinkProps } from 'react-router-dom'

import { ListItemButton, type ListItemButtonProps } from '@mui/material'

const LinkListItem = (props: ListItemButtonProps & LinkProps) => (
  <ListItemButton component={Link} {...props} />
)

export default LinkListItem
