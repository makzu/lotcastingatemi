// @flow
import * as React from 'react'
const { PureComponent, Fragment } = React
import { connect } from 'react-redux'
import { withRouter, Link, NavLink } from 'react-router-dom'

import { withStyles } from '@material-ui/core/styles'
import Divider from '@material-ui/core/Divider'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import Switch from '@material-ui/core/Switch'

import CharacterNavList from './characterNavList.jsx'
import ChronicleNavList from './chronicleNavList.jsx'
import ErrorBoundary from 'containers/ErrorBoundary.jsx'
import Discord from 'icons/Discord-Logo.jsx'
import Patreon from 'icons/Patreon-Logo.jsx'
import OctoCat from 'icons/OctoCat.jsx'
import { logout, closeDrawer, switchTheme } from 'ducks/actions.js'
import { getCurrentPlayer } from 'selectors'

// eslint-disable-next-line no-unused-vars
const styles = theme => ({
  themeLabel: {
    textTransform: 'capitalize',
  },
})

type Props = {
  authenticated: boolean,
  displayName: string,
  theme: string,
  logout: Function,
  switchTheme: Function,
  closeDrawer: Function,
  drawerOpen: boolean,
  classes: Object,
}

export class NavPanel extends PureComponent<Props> {
  closeCheck = () => {
    if (this.props.drawerOpen) this.props.closeDrawer()
  }

  render() {
    const {
      authenticated,
      displayName,
      theme,
      switchTheme,
      classes,
      logout,
    } = this.props
    const { closeCheck } = this

    return (
      <ErrorBoundary>
        <List component="nav">
          {authenticated && (
            <ListItem
              button
              component={NavLink}
              to="/settings"
              onClick={closeCheck}
            >
              <ListItemText primary={`Logged in as ${displayName}`} />
            </ListItem>
          )}

          <ListItem button component={NavLink} to="/" onClick={closeCheck}>
            <ListItemText primary="Home" />
          </ListItem>

          {!authenticated && (
            <Fragment>
              <ListItem button component="a" href="/auth/google_oauth2">
                <ListItemText primary="Log in with Google" />
              </ListItem>

              {window.location.hostname === 'localhost' && (
                <ListItem button component="a" href="/auth/developer">
                  <ListItemText primary="Log in (Developer)" />
                </ListItem>
              )}
            </Fragment>
          )}

          {authenticated && (
            <Fragment>
              <CharacterNavList closeDrawer={closeCheck} />

              <ChronicleNavList closeDrawer={closeCheck} />
            </Fragment>
          )}

          <ListItem
            button
            component={NavLink}
            to="/resources"
            onClick={closeCheck}
          >
            <ListItemText primary="Resources" />
          </ListItem>

          {authenticated && (
            <ListItem
              button
              component={NavLink}
              to="/settings"
              onClick={closeCheck}
            >
              <ListItemText primary="Settings" />
            </ListItem>
          )}
          <ListItem
            button
            onClick={() => switchTheme(theme == 'light' ? 'dark' : 'light')}
          >
            <ListItemText
              primary={`Current Theme: ${theme}`}
              className={classes.themeLabel}
            />
            <ListItemSecondaryAction>
              <Switch
                checked={theme == 'dark'}
                onChange={() =>
                  switchTheme(theme == 'light' ? 'dark' : 'light')
                }
              />
            </ListItemSecondaryAction>
          </ListItem>

          <Divider />

          {authenticated && (
            <Fragment>
              <ListItem button component={Link} to="/" onClick={logout}>
                <ListItemText primary="Log Out" />
              </ListItem>

              <Divider />
            </Fragment>
          )}

          <ListItem
            button
            component="a"
            href="https://github.com/makzu/lotcastingatemi"
            target="_blank"
            rel="noopener noreferrer"
            onClick={closeCheck}
          >
            <ListItemIcon>
              <OctoCat />
            </ListItemIcon>

            <ListItemText primary="View Source on GitHub" />
          </ListItem>
          <ListItem
            button
            component="a"
            href="https://discord.gg/zmpWyMv"
            target="_blank"
            rel="noopener noreferrer"
            onClick={closeCheck}
          >
            <ListItemIcon>
              <Discord />
            </ListItemIcon>
            <ListItemText primary="Discuss on Discord" />
          </ListItem>

          <ListItem
            button
            component="a"
            href="https://www.patreon.com/hushnowquietnow"
            target="_blank"
            rel="noopener noreferrer"
            onClick={closeCheck}
          >
            <ListItemIcon>
              <Patreon />
            </ListItemIcon>
            <ListItemText primary="Support on Patreon" />
          </ListItem>
        </List>
      </ErrorBoundary>
    )
  }
}

function mapStateToProps(state) {
  const { authenticated } = state.session
  const { theme, drawerOpen } = state.app
  const displayName = getCurrentPlayer(state).display_name || ''
  return {
    authenticated,
    theme,
    drawerOpen,
    displayName,
  }
}

export default withStyles(styles)(
  withRouter(
    connect(
      mapStateToProps,
      { logout, closeDrawer, switchTheme }
    )(NavPanel)
  )
)
