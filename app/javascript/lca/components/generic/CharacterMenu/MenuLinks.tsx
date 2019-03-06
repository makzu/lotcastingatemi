import * as React from 'react'

import { ListItemText } from '@material-ui/core'

import { MenuItemProps as Props } from './CharacterMenu'
import LinkMenuItem from './LinkMenuItem'

const CardMenuLinks = ({ id, characterType }: Props) => (
  <LinkMenuItem to={`/${characterType}s/${id}`}>
    <ListItemText primary="Full Sheet" />
  </LinkMenuItem>
)

export default CardMenuLinks
