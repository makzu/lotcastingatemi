import * as React from 'react'
import { connect } from 'react-redux'

import {
  Collapse,
  Divider,
  IconButton,
  ListItem,
  ListItemSecondaryAction,
  ListItemText
} from '@material-ui/core/'
import { ExpandLess, ExpandMore } from '@material-ui/icons/'

import NavLinkListItem from 'components/nav/NavLinkListItem'
import { getSpecificCharacter } from 'ducks/entities'
import { Character } from 'types'

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

  return (
    <>
      <Divider />

      <NavLinkListItem to={`/characters/${id}`}>
        <ListItemText primary={character.name} />
        <ListItemSecondaryAction>
          <IconButton onClick={() => setOpen(!isOpen)}>
            {isOpen ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
        </ListItemSecondaryAction>
      </NavLinkListItem>

      <Collapse in={isOpen}>
        <NavLinkListItem to={`/characters/${id}`}>
          <ListItemText inset primary="Overview" />
        </NavLinkListItem>

        <NavLinkListItem to={`/characters/${id}/merits`}>
          <ListItemText inset primary="Merits" />
        </NavLinkListItem>

        <NavLinkListItem to={`/characters/${id}/charms`}>
          <ListItemText inset primary="Charms" />
        </NavLinkListItem>

        <NavLinkListItem to={`/characters/${id}/bio`}>
          <ListItemText inset primary="Bio/Misc" />
        </NavLinkListItem>
      </Collapse>

      <Divider />
    </>
  )
}

const mapStateToProps = (state, props) => {
  const { id } = props.match.params
  const character = getSpecificCharacter(state, id)

  return {
    character,
    id,
  }
}

export default connect(mapStateToProps)(SideNavigation)
