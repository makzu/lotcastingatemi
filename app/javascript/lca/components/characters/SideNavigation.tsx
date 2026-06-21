import { useState } from 'react'
import { connect } from 'react-redux'
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
import { getSpecificCharacter } from '@lca/ducks/entities/index.ts'
import type { State } from '@lca/ducks/index.ts'
import type { Character } from '@lca/types/index.ts'
import type { RouteWithIdProps as RouteProps } from '@lca/types/util.ts'

interface Props {
  character: Character
  id: number
}

const SideNavigation = (props: Props) => {
  const { character, id } = props
  const [isOpen, setOpen] = useState(true)

  if (character == null) {
    return null
  }

  const prefix = `/characters/${id}`

  return (
    <>
      <Divider />

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

        <NavLinkListItem to={`${prefix}/charmss`}>
          <ListItemText primary="New Charms page" />
        </NavLinkListItem>

        <NavLinkListItem to={`${prefix}/sorcery`}>
          <ListItemText primary="Sorcery" />
        </NavLinkListItem>

        <NavLinkListItem to={`${prefix}/bio`}>
          <ListItemText primary="Bio/Misc" />
        </NavLinkListItem>
      </Collapse>
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

export default withRouter(connect(mapStateToProps)(SideNavigation))
