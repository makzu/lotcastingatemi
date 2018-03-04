import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter, NavLink } from 'react-router-dom'

import { withStyles } from 'material-ui/styles'
import Divider from 'material-ui/Divider'
import List, { ListItem, ListItemText, ListItemSecondaryAction } from 'material-ui/List'
import Switch from 'material-ui/Switch'

import ChronicleNavList from './chronicleNavList.jsx'
import DisplayNamePopup from '../generic/displayNamePopup.jsx'
import { switchTheme } from '../../ducks/actions.js'

const styles = theme => ({
  loggedInHeader: { ...theme.typography.subheading,
    padding: `${theme.spacing.unit * 2}px`,
  },
  themeLabel: {
    textTransform: 'capitalize',
  },
})

export class NavPanel extends React.Component {
  render() {
    const { authenticated, displayName, theme, classes } = this.props

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

        { authenticated && <Fragment>
          <ListItem button component={ NavLink } to="/content">
            <ListItemText primary="Characters" />
          </ListItem>

          <ChronicleNavList />
        </Fragment>}

        <ListItem button component={ NavLink } to="/resources">
          <ListItemText primary="Resources" />
        </ListItem>

        <ListItem button onClick={ this.props.switchTheme }>
          <ListItemText primary={ `Current Theme: ${ theme }` }
          />
          <ListItemSecondaryAction>
            <Switch checked={ theme == 'dark' } onChange={ this.props.switchTheme }/>
          </ListItemSecondaryAction>
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
  theme: PropTypes.string,
  switchTheme: PropTypes.func,
  classes: PropTypes.object,
}

function mapStateToProps(state) {
  const { authenticated, id } = state.session
  const displayName = state.entities.players[id].display_name || ''
  const { theme } = state.app

  return {
    authenticated,
    displayName,
    theme,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    switchTheme: () => dispatch(switchTheme()),
  }
}

export default withStyles(styles)(withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(NavPanel)))
