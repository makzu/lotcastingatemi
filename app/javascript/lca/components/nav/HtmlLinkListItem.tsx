import * as React from 'react'

import ListItem, { ListItemProps } from '@material-ui/core/ListItem'

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
