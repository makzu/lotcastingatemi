// @flow
import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'

import IconButton from 'material-ui/IconButton'
import { ListItem, ListItemText, ListItemSecondaryAction } from 'material-ui/List'
import Collapse from 'material-ui/transitions/Collapse'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'

import { getMyPinnedCharacters, getMyPinnedQCs, getMyPinnedBattlegroups } from '../../selectors'

export type Props = {
  characters: Array<Object>,
  qcs: Array<Object>,
  battlegroups: Array<Object>,
  closeDrawer: Function,
};

class CharacterNavList extends Component<Props, { open: boolean }> {
  constructor(props: Props) {
    super(props)
    this.state = { open: false }

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick = () => {
    this.setState({ open: !this.state.open })
  }

  render() {
    const { characters, qcs, battlegroups, closeDrawer } = this.props

    const showExpando = !!characters.length || !!qcs.length || !!battlegroups.length

    const characterList = characters.map((c) =>
      <ListItem key={ c.id } button onClick={ closeDrawer }
        component={ NavLink } to={ `/characters/${c.id}` }
      >
        <ListItemText inset
          primary={ c.name }
        />
      </ListItem>
    )
    const qcList = qcs.map((c) =>
      <ListItem key={ c.id } button onClick={ closeDrawer }
        component={ NavLink } to={ `/qcs/${c.id}` }
      >
        <ListItemText inset
          primary={ c.name }
        />
      </ListItem>
    )
    const bgList = battlegroups.map((c) =>
      <ListItem key={ c.id } button onClick={ closeDrawer }
        component={ NavLink } to={ `/battlegroups/${c.id}` }
      >
        <ListItemText inset
          primary={ c.name }
        />
      </ListItem>
    )

    return <Fragment>
      <ListItem button component={ NavLink } to="/content" onClick={ closeDrawer }>
        <ListItemText primary="Characters" />
        { showExpando &&
          <ListItemSecondaryAction>
            <IconButton onClick={ this.handleClick }>
              { this.state.open ? <ExpandLess /> : <ExpandMore /> }
            </IconButton>
          </ListItemSecondaryAction>
        }
      </ListItem>

      <Collapse in={ this.state.open }>
        { characterList }
        { qcList }
        { bgList }
      </Collapse>
    </Fragment>
  }
}

function mapStateToProps(state) {
  return {
    characters: getMyPinnedCharacters(state),
    qcs: getMyPinnedQCs(state),
    battlegroups: getMyPinnedBattlegroups(state),
  }
}

export default connect(mapStateToProps)(CharacterNavList)
