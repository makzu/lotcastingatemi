import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter, NavLink } from 'react-router-dom'

import { withStyles } from 'material-ui/styles'
import Divider from 'material-ui/Divider'
import List, { ListItem, ListItemText } from 'material-ui/List'

import DisplayNamePopup from './generic/displayNamePopup.jsx'

const styles = theme => ({
  loggedInHeader: { ...theme.typography.subheading,
    padding: `${theme.spacing.unit * 2}px`,
  },
})

export class NavPanel extends React.Component {
  render() {
    const { authenticated, displayName, classes } = this.props

    return <div>
      <List component="nav">
        { authenticated &&
          <div className={ classes.loggedInHeader }>
            <DisplayNamePopup>Logged in as { displayName }</DisplayNamePopup>
          </div>
        }
        <Divider />

        <ListItem button component={ NavLink } to="/">
          <ListItemText primary="Home" />
        </ListItem>

        { !authenticated &&
          <ListItem button component="a" href="/auth/google_oauth2">
            <ListItemText primary="Log in with Google"
            />
          </ListItem>
        }

        { authenticated &&
          <ListItem button component={ NavLink } to="/content">
            <ListItemText primary="Characters" />
          </ListItem>
        }

        <Divider />
        <ListItem>
          <ListItemText primary="Resources" />
        </ListItem>

        <Divider />
        <ListItem button component="a"
          href="https://github.com/makzu/lotcastingatemi"
          target="_blank" rel="noopener noreferrer"
        >
          <ListItemText primary="View on GitHub" />
        </ListItem>

      </List>
    </div>
  }
}
NavPanel.propTypes = {
  authenticated: PropTypes.bool,
  displayName: PropTypes.string,
  history: PropTypes.object,
}

function mapStateToProps(state) {
  const { authenticated, id } = state.session
  const displayName = state.entities.players[id].display_name || ''

  return {
    authenticated,
    displayName,
  }
}

export default withStyles(styles)(withRouter(connect(
  mapStateToProps
)(NavPanel)))
