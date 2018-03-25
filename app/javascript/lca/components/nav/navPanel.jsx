import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter, NavLink } from 'react-router-dom'

import { withStyles } from 'material-ui/styles'
import Divider from 'material-ui/Divider'
import List, { ListItem, ListItemIcon, ListItemText, ListItemSecondaryAction } from 'material-ui/List'
import Switch from 'material-ui/Switch'

import CharacterNavList from './characterNavList.jsx'
import ChronicleNavList from './chronicleNavList.jsx'
import DisplayNamePopup from '../generic/displayNamePopup.jsx'
import Discord from '../../icons/Discord-Logo.jsx'
import OctoCat from '../../icons/OctoCat.jsx'
import { closeDrawer, switchTheme } from '../../ducks/actions.js'

const styles = theme => ({
  loggedInHeader: { ...theme.typography.subheading,
    padding: `${theme.spacing.unit * 2}px`,
  },
  themeLabel: {
    textTransform: 'capitalize',
  },
})

export class NavPanel extends React.Component {
  constructor(props) {
    super(props)
    this.closeCheck = this.closeCheck.bind(this)
  }

  closeCheck() {
    if (this.props.drawerOpen)
      this.props.closeDrawer()
  }

  render() {
    const {
      authenticated, displayName, theme, switchTheme, classes,
    } = this.props
    const { closeCheck } = this

    return <div>
      <List component="nav">
        { authenticated &&
          <div className={ classes.loggedInHeader }>
            <DisplayNamePopup>Logged in as { displayName }</DisplayNamePopup>
          </div>
        }
        <Divider />

        <ListItem button component={ NavLink } to="/" onClick={ closeCheck }>
          <ListItemText primary="Home" />
        </ListItem>

        { !authenticated &&
          <ListItem button component="a" href="/auth/google_oauth2">
            <ListItemText primary="Log in with Google"
            />
          </ListItem>
        }
        { !authenticated && window.location.href.includes('localhost') &&
          <ListItem button component="a" href="/auth/developer">
            <ListItemText primary="Log in (Developer)"
            />
          </ListItem>
        }

        { authenticated && <Fragment>
          <CharacterNavList closeDrawer={ closeCheck } />

          <ChronicleNavList closeDrawer={ closeCheck } />
        </Fragment> }

        <ListItem button component={ NavLink } to="/resources" onClick={ closeCheck }>
          <ListItemText primary="Resources" />
        </ListItem>

        <ListItem button onClick={ () => switchTheme(theme == 'light' ? 'dark' : 'light') }>
          <ListItemText primary={ `Current Theme: ${ theme }` }
          />
          <ListItemSecondaryAction>
            <Switch checked={ theme == 'dark' } onChange={ () => switchTheme(theme == 'light' ? 'dark' : 'light') } />
          </ListItemSecondaryAction>
        </ListItem>
        <Divider />

        <ListItem button component="a"
          href="https://github.com/makzu/lotcastingatemi"
          target="_blank" rel="noopener noreferrer"
          onClick={ closeCheck }
        >
          <ListItemIcon>
            <OctoCat />
          </ListItemIcon>

          <ListItemText primary="View Source on GitHub" />
        </ListItem>
        <ListItem button component="a"
          href="https://discord.gg/zmpWyMv"
          target="_blank" rel="noopener noreferrer"
          onClick={ closeCheck }
        >
          <ListItemIcon>
            <Discord />
          </ListItemIcon>
          <ListItemText primary="Discuss on Discord" />
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
  closeDrawer: PropTypes.func,
  drawerOpen: PropTypes.bool,
  classes: PropTypes.object,
}

function mapStateToProps(state) {
  const { authenticated, id } = state.session
  const displayName = state.entities.players[id].display_name || ''
  const { theme, drawerOpen } = state.app

  return {
    authenticated,
    displayName,
    theme,
    drawerOpen,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    closeDrawer: () => dispatch(closeDrawer()),
    switchTheme: (theme) => dispatch(switchTheme(theme)),
  }
}

export default withStyles(styles)(withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(NavPanel)))
