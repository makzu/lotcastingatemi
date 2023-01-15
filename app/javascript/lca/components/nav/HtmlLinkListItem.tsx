import ListItem, { ListItemProps } from '@mui/material/ListItem'

const HtmlLinkListItem = (props: ListItemProps & { href: string }) => (
  <ListItem
    button
    component="a"
    target="_blank"
    rel="noopener noreferrer"
    {...props}
  />
)

export default HtmlLinkListItem
