import { Route, Switch as RouterSwitch } from 'react-router-dom'
import {
  type ButtonProps,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core'
import { makeStyles, type Theme } from '@material-ui/core/styles'
import type { Location } from 'history'

import CharacterSheetNav from '@lca/components/CharacterSheet/CharacterSheetNav.tsx'
import CharacterEditorNav from '@lca/components/characterEditor/CharacterEditorNav.tsx'
import { NavLinkListItem } from '@lca/components/shared/wrappers/'
import ErrorBoundary from '@lca/containers/ErrorBoundary'
import Discord from '@lca/icons/Discord-Logo.jsx'
import OctoCat from '@lca/icons/OctoCat.jsx'
import Patreon from '@lca/icons/Patreon-Logo.jsx'
import ChronicleNavList from './ChronicleNavList'
import { BattlegroupNavList, CharacterNavList, QcNavList } from './EntityLists/'
import HtmlLinkListItem from './HtmlLinkListItem.tsx'
import NavPanelLogout from './NavPanelLogout.tsx'
import NavPanelThemeSwitch from './NavPanelThemeSwitch.tsx'

const useStyles = makeStyles((theme: Theme) => ({
  navElement: {
    '& .active': {
      backgroundColor: theme.palette.action.selected,
    },
  },
}))

const CsrfInput = () => {
  const csrfToken = document.getElementsByTagName('meta')['csrf-token'].content
  return <input type="hidden" name="authenticity_token" value={csrfToken} />
}

const SubmitButton = (props: ButtonProps) => <button {...props} type="submit" />

const LoginForm = ({ text, action }) => {
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
          <LoginForm action="/auth/developer" text="Log in (Developer)" />
        )}
        {!authenticated && (
          <LoginForm action="/auth/google_oauth2" text="Log in with Google" />
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

        {authenticated && <NavPanelLogout />}
      </List>
    </ErrorBoundary>
  )
}

export default NavPanel
