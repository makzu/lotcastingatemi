import * as React from 'react'
import { connect } from 'react-redux'

import {
  Collapse,
  Divider,
  IconButton,
  ListItemSecondaryAction,
  ListItemText
} from '@material-ui/core/'
import { ExpandLess, ExpandMore } from '@material-ui/icons/'

import LinkListItem from 'components/nav/LinkListItem'
import NavLinkListItem from 'components/nav/NavLinkListItem'
import { State } from 'ducks'
import { getSpecificCharacter } from 'ducks/entities'
import { Character } from 'types'
import { RouteWithIdProps as RouteProps } from 'types/util'

interface Props {
  character: Character
  id: number
}

const SideNavigation = (props: Props) => {
  const { character, id } = props
  const [isOpen, setOpen] = React.useState(true)

  if (character == null) {
    return null
  }

  const prefix = `/characters/${id}`

  return (
    <>
      <LinkListItem to={`${prefix}`}>
        <ListItemText primary={character.name} />
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

        <NavLinkListItem to={`${prefix}/sorcery`}>
          <ListItemText primary="Sorcery" />
        </NavLinkListItem>

        <NavLinkListItem to={`${prefix}/bio`}>
          <ListItemText primary="Bio/Misc" />
        </NavLinkListItem>
      </Collapse>

      <Divider />
    </>
  )
}

const mapStateToProps = (state: State, { match }: RouteProps) => {
  const id = parseInt(match.params.id, 10)

  return {
    character: getSpecificCharacter(state, id),
    id,
  }
}

export default connect(mapStateToProps)(SideNavigation)
