import { useState } from 'react'
import { withRouter } from 'react-router-dom'
import {
  Collapse,
  Divider,
  IconButton,
  ListItemSecondaryAction,
  ListItemText,
} from '@material-ui/core/'
import { ExpandLess, ExpandMore } from '@material-ui/icons/'

import {
  LinkListItem,
  NavLinkListItem,
} from '@lca/components/shared/wrappers/index.ts'
import { useCharacterAttribute } from '@lca/ducks/entities/index.ts'
import type { RouteWithIdProps as RouteProps } from '@lca/types/util.ts'

const SideNavigation = ({ match }: RouteProps) => {
  const id = parseInt(match.params.id, 10)
  const characterName = useCharacterAttribute(id, 'name')

  const [isOpen, setOpen] = useState(true)

  if (characterName == null) {
    return null
  }

  const prefix = `/characters/${id}`

  return (
    <>
      <Divider />

      <LinkListItem to={`${prefix}`}>
        <ListItemText primary={characterName} />
        <ListItemSecondaryAction>
          <IconButton onClick={() => setOpen(!isOpen)}>
            {isOpen ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
        </ListItemSecondaryAction>
      </LinkListItem>

      <Collapse in={isOpen}>
        <NavLinkListItem to={`${prefix}`}>
          <ListItemText primary="Overview" />
        </NavLinkListItem>

        <NavLinkListItem to={`${prefix}/merits`}>
          <ListItemText primary="Merits" />
        </NavLinkListItem>

        <NavLinkListItem to={`${prefix}/charms`}>
          <ListItemText primary="Charms" />
        </NavLinkListItem>

        {/* 
        <NavLinkListItem to={`${prefix}/sorcery`}>
          <ListItemText primary="Sorcery" />
        </NavLinkListItem>
        */}

        <NavLinkListItem to={`${prefix}/bio`}>
          <ListItemText primary="Bio/Misc" />
        </NavLinkListItem>
      </Collapse>
    </>
  )
}

export default withRouter(SideNavigation)
