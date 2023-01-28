import { Link, ListItemButton, ListItemButtonProps } from '@mui/material'

const HtmlLinkListItem = (props: ListItemButtonProps<'a'>) => (
  <ListItemButton
    component={Link}
    target="_blank"
    rel="noopener noreferrer"
    {...props}
  />
)

export default HtmlLinkListItem
