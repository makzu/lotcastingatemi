import * as React from 'react'
import { withRouter } from 'react-router-dom'

import {
  Collapse,
  Divider,
  IconButton,
  ListItemSecondaryAction,
  ListItemText,
} from '@material-ui/core/'
import { ExpandLess, ExpandMore } from '@material-ui/icons/'

import { LinkListItem, NavLinkListItem } from 'components/shared/wrappers/'
import { useCharacterAttribute } from 'ducks/entities'
import { RouteWithIdProps as RouteProps } from 'types/util'

const CharacterEditorNav = ({ match }: RouteProps) => {
  // @ts-expect-error Hooks migration will fix this
  const id = parseInt(match.params.id, 10)
  const characterName = useCharacterAttribute(id, 'name')

  const [isOpen, setOpen] = React.useState(true)

  if (characterName == null) {
    return null
  }

  const prefix = `/characters/${id}/edit`

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

export default withRouter(CharacterEditorNav)
