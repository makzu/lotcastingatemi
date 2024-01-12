import { Link } from 'react-router-dom'

import { ListItemButton, ListItemButtonProps } from '@mui/material'

const LinkListItem = (props: ListItemButtonProps<typeof Link>) => (
  <ListItemButton component={Link} {...props} />
)

export default LinkListItem
