import { useState } from 'react'

import {
  Collapse,
  Divider,
  IconButton,
  ListItemSecondaryAction,
  ListItemText,
} from '@mui/material/'
import { ExpandLess, ExpandMore } from '@mui/icons-material/'

import { LinkListItem, NavLinkListItem } from 'components/shared/wrappers/'
import { useCharacterAttribute } from 'ducks/entities'
import { useIdFromParams } from 'hooks'

const SideNavigation = () => {
  const id = useIdFromParams()
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
          <IconButton onClick={() => setOpen(!isOpen)} size="large">
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

        {/* <NavLinkListItem to={`${prefix}/charmss`}>
        <ListItemText primary="New Charms page" />
      </NavLinkListItem>

      <NavLinkListItem to={`${prefix}/sorcery`}>
        <ListItemText primary="Sorcery" />
      </NavLinkListItem> */}

        <NavLinkListItem to={`${prefix}/bio`}>
          <ListItemText primary="Bio/Misc" />
        </NavLinkListItem>
      </Collapse>
    </>
  )
}

export default SideNavigation
