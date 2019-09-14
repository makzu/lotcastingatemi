import * as React from 'react'

import { ListItemText } from '@material-ui/core'

import NavLinkListItem from 'components/shared/wrappers/NavLinkListItem'

interface Props {
  link: string
  name: string
  desc?: string
}
const EntityListItem = ({ link, name, desc }: Props) => (
  <NavLinkListItem to={link} exact={false}>
    <ListItemText primary={name} secondary={desc} />
  </NavLinkListItem>
)

export default EntityListItem
