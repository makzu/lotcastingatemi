import { ListItemText } from '@mui/material'

import NavLinkListItem from 'components/shared/wrappers/NavLinkListItem'

interface Props {
  link: string
  name: string
  desc?: string
}
const EntityListItem = ({ link, name, desc }: Props) => (
  <NavLinkListItem to={link}>
    <ListItemText primary={name} secondary={desc} />
  </NavLinkListItem>
)

export default EntityListItem
