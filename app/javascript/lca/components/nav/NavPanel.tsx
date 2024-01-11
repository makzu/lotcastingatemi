import { Location } from 'history'
import * as React from 'react'
import { Route, Switch as RouterSwitch } from 'react-router-dom'

import {
  ButtonProps,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core'
import { Theme } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/styles'

import CharacterEditorNav from 'components/characterEditor/CharacterEditorNav'
import CharacterSheetNav from 'components/CharacterSheet/CharacterSheetNav'
import { NavLinkListItem } from 'components/shared/wrappers/'
import ErrorBoundary from 'containers/ErrorBoundary.jsx'
import Discord from 'icons/Discord-Logo.jsx'
import OctoCat from 'icons/OctoCat.jsx'
import Patreon from 'icons/Patreon-Logo.jsx'
import ChronicleNavList from './chronicleNavList.jsx'
import { BattlegroupNavList, CharacterNavList, QcNavList } from './EntityLists/'
import HtmlLinkListItem from './HtmlLinkListItem'
import NavPanelLogout from './NavPanelLogout'
import NavPanelThemeSwitch from './NavPanelThemeSwitch'

const useStyles = makeStyles((theme: Theme) => ({
  navElement: {
    '& .active': {
      backgroundColor: theme.palette.action.selected,
    },
  },
}))

const CsrfInput = () => {
  // TODO this is duplicated in LogoutPopup.tsx
  const metaTags = document.getElementsByTagName('meta').namedItem('csrf-token')
  // @ts-expect-error TODO figure out how to convince typescript that this tag will always be here
  const csrfToken = metaTags.content
  return <input type="hidden" name="authenticity_token" value={csrfToken} />
}

const SubmitButton = (props: ButtonProps) => <button {...props} type="submit" />

const LoginForm = ({ text, action }: { text: string; action: string }) => {
  return (
    <form action={action} method="POST">
      <CsrfInput />
      <ListItem button component={SubmitButton}>
        <ListItemText primary={text} />
      </ListItem>
    </form>
  )
}

const isOnHelpPage = (_: never, location: Location) =>
  location.pathname.startsWith('/help')

const isDeveloperMode = () => location.hostname === 'localhost'

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
  const classes = useStyles({})

  return (
    <ErrorBoundary>
      <List component="nav" className={classes.navElement}>
        {authenticated && (
          <NavLinkListItem to="/settings" onClick={closeCheck}>
            <ListItemText primary={`Logged in as ${displayName}`} />
          </NavLinkListItem>
        )}

        <RouterSwitch>
          <Route path="/characters/:id/edit" component={CharacterEditorNav} />
          <Route path="/characters/:id" component={CharacterSheetNav} />
        </RouterSwitch>

        <Divider />

        {authenticated && (
          <>
            <CharacterNavList closeDrawer={closeCheck} />

            <Divider />
            <QcNavList closeDrawer={closeCheck} />

            <Divider />

            <BattlegroupNavList closeDrawer={closeCheck} />

            <Divider />

            <ChronicleNavList closeDrawer={closeCheck} />
          </>
        )}
        {!authenticated && isDeveloperMode() && (
          <>
            <LoginForm action="/auth/developer" text="Log in (Developer)" />
          </>
        )}
        {!authenticated && !isDeveloperMode() && (
          <>
            <LoginForm action="/auth/google_oauth2" text="Log in with Google" />
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
