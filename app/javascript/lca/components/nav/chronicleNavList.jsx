import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { ListSubheader, ListItem, ListItemText } from 'material-ui/List'
import Collapse from 'material-ui/transitions/Collapse'

import StarBorder from 'material-ui-icons/StarBorder'
import ExpandLess from 'material-ui-icons/ExpandLess'
import ExpandMore from 'material-ui-icons/ExpandMore'

import ChronicleCreatePopup from '../chronicles/chronicleCreatePopup.jsx'
import ChronicleJoinPopup from '../chronicles/chronicleJoinPopup.jsx'

class ChronicleNavList extends React.Component {
  constructor(props) {
    super(props)
    this.state = { open: false }

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    this.setState({ open: !this.state.open })
  }

  render() {
    const ownChronicleList = this.props.ownChronicles.map((c) =>
      <ListItem key={ c.id } button
        component={ Link } to={ `/chronicles/${c.id}` }
      >
        <ListItemText inset
          primary={ c.name }
          secondary={ `${(c.players || '').length} Player${(c.players || '').length == 1 ? '' : 's'}` }
        />
        <StarBorder />
      </ListItem>
    )
    const chronicleList = this.props.chronicles.map((c) =>
      <ListItem key={ c.id } button
        component={ Link } to={ `/chronicles/${c.id}` }
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
        { this.state.open ? <ExpandLess /> : <ExpandMore /> }
      </ListItem>
      <Collapse in={ this.state.open }>
        { ownChronicleList &&
          <ListSubheader inset>Your Chronicles</ListSubheader>
        }
        { ownChronicleList }
        <ListSubheader inset>Joined Chronicles</ListSubheader>
        { chronicleList || <ListItem><ListItemText primary="None" /></ListItem> }

        <ChronicleJoinPopup />
        <ChronicleCreatePopup />
      </Collapse>
    </Fragment>
  }
}
ChronicleNavList.propTypes = {
  ownChronicles: PropTypes.arrayOf(PropTypes.object),
  chronicles: PropTypes.arrayOf(PropTypes.object),
}

function mapStateToProps(state) {
  const id = state.session.id
  return {
    ownChronicles: state.entities.players[id].own_chronicles.map((c) => state.entities.chronicles[c]),
    chronicles: state.entities.players[id].chronicles.map((c) => state.entities.chronicles[c]),
  }
}

export default connect(mapStateToProps)(ChronicleNavList)
