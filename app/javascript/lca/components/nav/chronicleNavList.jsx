// @flow
import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'

import IconButton from 'material-ui/IconButton'
import {
  ListSubheader,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
} from 'material-ui/List'
import Collapse from 'material-ui/transitions/Collapse'

import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'

import ChronicleCreatePopup from '../chronicles/chronicleCreatePopup.jsx'
import ChronicleJoinPopup from '../chronicles/chronicleJoinPopup.jsx'
import { getMyChronicles, getMyOwnChronicles } from 'selectors'

type Props = {
  ownChronicles: Array<Object>,
  chronicles: Array<Object>,
  closeDrawer: Function,
}

type State = {
  open: boolean,
}

class ChronicleNavList extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { open: false }
  }

  handleClick = () => {
    this.setState({ open: !this.state.open })
  }

  render() {
    const { ownChronicles, chronicles, closeDrawer } = this.props

    const ownChronicleList = ownChronicles.map(c => (
      <ListItem
        key={c.id}
        button
        onClick={closeDrawer}
        component={NavLink}
        to={`/chronicles/${c.id}`}
      >
        <ListItemText
          inset
          primary={c.name}
          secondary={`${(c.players || '').length} Player${
            (c.players || '').length == 1 ? '' : 's'
          }`}
        />
      </ListItem>
    ))
    const chronicleList = chronicles.map(c => (
      <ListItem
        key={c.id}
        button
        onClick={closeDrawer}
        component={NavLink}
        to={`/chronicles/${c.id}`}
      >
        <ListItemText
          inset
          primary={c.name}
          secondary={`${(c.players || '').length} Player${
            (c.players || '').length == 1 ? '' : 's'
          }`}
        />
      </ListItem>
    ))

    return (
      <Fragment>
        <ListItem button onClick={this.handleClick}>
          <ListItemText primary="Chronicles" />

          <ListItemSecondaryAction>
            <IconButton onClick={this.handleClick}>
              {this.state.open ? <ExpandLess /> : <ExpandMore />}
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>

        <Collapse in={this.state.open}>
          {ownChronicleList.length > 0 && (
            <ListSubheader inset>Your Chronicles</ListSubheader>
          )}
          {ownChronicleList}
          {chronicleList.length > 0 && (
            <ListSubheader inset>Joined Chronicles</ListSubheader>
          )}
          {chronicleList}

          <ChronicleJoinPopup />
          <ChronicleCreatePopup />
        </Collapse>
      </Fragment>
    )
  }
}

const mapStateToProps = state => ({
  ownChronicles: getMyOwnChronicles(state),
  chronicles: getMyChronicles(state),
})

export default connect(mapStateToProps)(ChronicleNavList)
