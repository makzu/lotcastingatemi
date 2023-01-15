// @flow
import { Component } from 'react';
import { connect } from 'react-redux'

import IconButton from '@material-ui/core/IconButton'
import ListSubheader from '@material-ui/core/ListSubheader'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import Collapse from '@material-ui/core/Collapse'

import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'

import ChronicleCreatePopup from '../chronicles/chronicleCreatePopup.jsx'
import ChronicleJoinPopup from '../chronicles/chronicleJoinPopup.jsx'
import { NavLinkListItem } from 'components/shared/wrappers'
import { getMyChronicles, getMyOwnChronicles } from 'selectors'
import type { Chronicle, Enhancer } from 'utils/flow-types'

type ExposedProps = {
  closeDrawer: Function,
}
type Props = ExposedProps & {
  ownChronicles: Array<Chronicle>,
  chronicles: Array<Chronicle>,
}
type State = {
  open: boolean,
}

class ChronicleNavList extends Component<Props, State> {
  state = { open: false }

  handleClick = () => {
    this.setState({ open: !this.state.open })
  }

  render() {
    const { ownChronicles, chronicles, closeDrawer } = this.props

    const chronicleMap = (c: Chronicle) => (
      <NavLinkListItem
        key={c.id}
        to={`/chronicles/${c.id}`}
        onClick={closeDrawer}
      >
        <ListItemText
          inset
          primary={c.name}
          secondary={`${(c.players || '').length} Player${
            (c.players || '').length == 1 ? '' : 's'
          }`}
        />
      </NavLinkListItem>
    )

    const ownChronicleList = ownChronicles.map(chronicleMap)
    const chronicleList = chronicles.map(chronicleMap)

    return (
      <>
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
      </>
    )
  }
}

const mapStateToProps = state => ({
  ownChronicles: getMyOwnChronicles(state),
  chronicles: getMyChronicles(state),
})

const enhance: Enhancer<Props, ExposedProps> = connect(mapStateToProps)

export default enhance(ChronicleNavList)
