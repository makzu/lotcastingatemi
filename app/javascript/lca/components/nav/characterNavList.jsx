// @flow
import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'

import IconButton from '@material-ui/core/IconButton'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import Collapse from '@material-ui/core/Collapse'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'

import {
  getMyPinnedCharacters,
  getMyPinnedQCs,
  getMyPinnedBattlegroups,
} from 'selectors'
import type { Character, fullQc, Battlegroup, Enhancer } from 'utils/flow-types'

type ExposedProps = {
  closeDrawer: Function,
}
type Props = ExposedProps & {
  characters: Array<Character>,
  qcs: Array<fullQc>,
  battlegroups: Array<Battlegroup>,
}
type State = {
  open: boolean,
}

class CharacterNavList extends React.Component<Props, State> {
  state = { open: false }

  handleClick = () => {
    this.setState({ open: !this.state.open })
  }

  render() {
    const { characters, qcs, battlegroups, closeDrawer } = this.props

    const showExpando =
      !!characters.length || !!qcs.length || !!battlegroups.length

    const characterList = characters.map(c => (
      <ListItem
        key={c.id}
        button
        onClick={closeDrawer}
        component={NavLink}
        to={`/characters/${c.id}`}
      >
        <ListItemText inset primary={c.name} />
      </ListItem>
    ))
    const qcList = qcs.map(c => (
      <ListItem
        key={c.id}
        button
        onClick={closeDrawer}
        component={NavLink}
        to={`/qcs/${c.id}`}
      >
        <ListItemText inset primary={c.name} />
      </ListItem>
    ))
    const bgList = battlegroups.map(c => (
      <ListItem
        key={c.id}
        button
        onClick={closeDrawer}
        component={NavLink}
        to={`/battlegroups/${c.id}`}
      >
        <ListItemText inset primary={c.name} />
      </ListItem>
    ))

    return (
      <>
        <ListItem
          button
          component={NavLink}
          to="/content"
          onClick={closeDrawer}
        >
          <ListItemText primary="Characters" />
          {showExpando && (
            <ListItemSecondaryAction>
              <IconButton onClick={this.handleClick}>
                {this.state.open ? <ExpandLess /> : <ExpandMore />}
              </IconButton>
            </ListItemSecondaryAction>
          )}
        </ListItem>

        <Collapse in={this.state.open}>
          {characterList}
          {qcList}
          {bgList}
        </Collapse>
      </>
    )
  }
}

const mapStateToProps = state => ({
  characters: getMyPinnedCharacters(state),
  qcs: getMyPinnedQCs(state),
  battlegroups: getMyPinnedBattlegroups(state),
})

const enhance: Enhancer<Props, ExposedProps> = connect(mapStateToProps)

export default enhance(CharacterNavList)
