import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'

import IconButton from 'material-ui/IconButton'
import { ListSubheader, ListItem, ListItemText, ListItemSecondaryAction } from 'material-ui/List'
import Collapse from 'material-ui/transitions/Collapse'

import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'

import ChronicleCreatePopup from '../chronicles/chronicleCreatePopup.jsx'
import ChronicleJoinPopup from '../chronicles/chronicleJoinPopup.jsx'
import { getMyChronicles, getMyOwnChronicles } from '../../selectors'

class ChronicleNavList extends Component {
  constructor(props) {
    super(props)
    this.state = { open: false }

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    this.setState({ open: !this.state.open })
  }

  render() {
    const { closeDrawer } = this.props

    const ownChronicleList = this.props.ownChronicles.map((c) =>
      <ListItem key={ c.id } button onClick={ closeDrawer }
        component={ NavLink } to={ `/chronicles/${c.id}` }
      >
        <ListItemText inset
          primary={ c.name }
          secondary={ `${(c.players || '').length} Player${(c.players || '').length == 1 ? '' : 's'}` }
        />
      </ListItem>
    )
    const chronicleList = this.props.chronicles.map((c) =>
      <ListItem key={ c.id } button onClick={ closeDrawer }
        component={ NavLink } to={ `/chronicles/${c.id}` }
      >
        <ListItemText inset
          primary={ c.name }
          secondary={ `${(c.players || '').length} Player${(c.players || '').length == 1 ? '' : 's'}` }
        />
      </ListItem>
    )

    return <Fragment>
      <ListItem button onClick={ this.handleClick }>
        <ListItemText primary="Chronicles" />

        <ListItemSecondaryAction>
          <IconButton onClick={ this.handleClick }>
            { this.state.open ? <ExpandLess /> : <ExpandMore /> }
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>

      <Collapse in={ this.state.open }>
        { ownChronicleList.length > 0 &&
          <ListSubheader inset>Your Chronicles</ListSubheader>
        }
        { ownChronicleList }
        { chronicleList.length > 0 &&
          <ListSubheader inset>Joined Chronicles</ListSubheader>
        }
        { chronicleList }

        <ChronicleJoinPopup />
        <ChronicleCreatePopup />
      </Collapse>
    </Fragment>
  }
}
ChronicleNavList.propTypes = {
  ownChronicles: PropTypes.arrayOf(PropTypes.object),
  chronicles: PropTypes.arrayOf(PropTypes.object),
  closeDrawer: PropTypes.func.isRequired,
}

function mapStateToProps(state) {
  return {
    ownChronicles: getMyOwnChronicles(state),
    chronicles: getMyChronicles(state),
  }
}

export default connect(mapStateToProps)(ChronicleNavList)
