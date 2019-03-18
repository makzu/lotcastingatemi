import { Location } from 'history'
import * as React from 'react'
import { connect } from 'react-redux'
import { Route, Switch as RouterSwitch, withRouter } from 'react-router-dom'
import { compose } from 'recompose'

import {
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core'
import { Theme } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/styles'

import CharacterNavigation from 'components/characters/SideNavigation'
import ErrorBoundary from 'containers/ErrorBoundary.jsx'
import { closeDrawer, logout } from 'ducks/actions.js'
import { State } from 'ducks/index.js'
import Discord from 'icons/Discord-Logo.jsx'
import OctoCat from 'icons/OctoCat.jsx'
import Patreon from 'icons/Patreon-Logo.jsx'
import { getCurrentPlayer } from 'selectors'
import ChronicleNavList from './chronicleNavList.jsx'
import { BattlegroupNavList, CharacterNavList, QcNavList } from './EntityLists/'
import HtmlLinkListItem from './HtmlLinkListItem'
import LinkListItem from './LinkListItem'
import NavLinkListItem from './NavLinkListItem'
import NavPanelLogout from './NavPanelLogout'
import NavPanelThemeSwitch from './NavPanelThemeSwitch'

const useStyles = makeStyles((theme: Theme) => ({
  navElement: {
    '& .active': {
      backgroundColor: theme.palette.action.selected,
    },
  },
}))

const isOnHelpPage = (_: {}, location: Location) =>
  location.pathname.startsWith('/help')

interface Props {
  authenticated: boolean
  displayName: string
  drawerOpen: boolean
  closeDrawer(): void
}

const NavPanel = (props: Props) => {
  const closeCheck = () => {
    if (props.drawerOpen) {
      props.closeDrawer()
    }
  }

  const { authenticated, displayName } = props
  const classes = useStyles()

  return (
    <ErrorBoundary>
      <List component="nav" className={classes.navElement}>
        {authenticated && (
          <NavLinkListItem to="/settings" onClick={closeCheck}>
            <ListItemText primary={`Logged in as ${displayName}`} />
          </NavLinkListItem>
        )}

        <RouterSwitch>
          <Route path="/characters/:id/edit" component={CharacterNavigation} />
          <Route path="/characters/:id" component={CharacterNavigation} />
        </RouterSwitch>

        <Divider />

        {authenticated ? (
          <>
            <CharacterNavList closeDrawer={closeCheck} />

            <QcNavList closeDrawer={closeCheck} />

            <BattlegroupNavList closeDrawer={closeCheck} />

            <Divider />

            <ChronicleNavList closeDrawer={closeCheck} />
          </>
        ) : (
          <>
            <ListItem button component="a" href="/auth/google_oauth2">
              <ListItemText primary="Log in with Google" />
            </ListItem>

            {window.location.hostname === 'localhost' && (
              <ListItem button component="a" href="/auth/developer">
                <ListItemText primary="Log in (Developer)" />
              </ListItem>
            )}
          </>
        )}

        <Divider />

        <NavLinkListItem to="/" onClick={closeCheck}>
          <ListItemText primary="Home" />
        </NavLinkListItem>

        <NavLinkListItem
          to="/help"
          onClick={closeCheck}
          isActive={isOnHelpPage}
        >
          <ListItemText primary="Help" />
        </NavLinkListItem>

        <NavLinkListItem to="/resources" onClick={closeCheck}>
          <ListItemText primary="Resources" />
        </NavLinkListItem>

        {authenticated && (
          <NavLinkListItem to="/settings" onClick={closeCheck}>
            <ListItemText primary="Settings" />
          </NavLinkListItem>
        )}

        <NavPanelThemeSwitch />

        <Divider />

        <HtmlLinkListItem
          href="https://github.com/makzu/lotcastingatemi"
          onClick={closeCheck}
        >
          <ListItemIcon>
            <OctoCat />
          </ListItemIcon>

          <ListItemText primary="View Source on GitHub" />
        </HtmlLinkListItem>

        <HtmlLinkListItem
          href="https://discord.gg/zmpWyMv"
          onClick={closeCheck}
        >
          <ListItemIcon>
            <Discord />
          </ListItemIcon>
          <ListItemText primary="Discuss on Discord" />
        </HtmlLinkListItem>

        <HtmlLinkListItem
          href="https://www.patreon.com/hushnowquietnow"
          onClick={closeCheck}
        >
          <ListItemIcon>
            <Patreon />
          </ListItemIcon>
          <ListItemText primary="Support on Patreon" />
        </HtmlLinkListItem>

        {authenticated && (
          <>
            <NavPanelLogout />
          </>
        )}
      </List>
    </ErrorBoundary>
  )
}

export default NavPanel
