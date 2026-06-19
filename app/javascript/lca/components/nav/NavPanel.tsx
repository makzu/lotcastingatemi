import { Route, Switch as RouterSwitch } from 'react-router-dom'
import {
  type ButtonProps,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core'
import { makeStyles, type Theme, useTheme } from '@material-ui/core/styles'
import type { Location } from 'history'

import CharacterSheetNav from '@lca/components/CharacterSheet/CharacterSheetNav.tsx'
import CharacterEditorNav from '@lca/components/characterEditor/CharacterEditorNav.tsx'
import { NavLinkListItem } from '@lca/components/shared/wrappers/'
import ErrorBoundary from '@lca/containers/ErrorBoundary'
import iconDiscordBlack from '@lca/icons/Discord-Symbol-Black.svg'
import iconDiscordWhite from '@lca/icons/Discord-Symbol-White.svg'
import iconGithubBlack from '@lca/icons/GitHub_Invertocat_Black.svg'
import iconGithubWhite from '@lca/icons/GitHub_Invertocat_White.svg'
import iconPatreonBlack from '@lca/icons/PATREON_SYMBOL_1_BLACK_RGB.svg'
import iconPatreonWhite from '@lca/icons/PATREON_SYMBOL_1_WHITE_RGB.svg'
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
  icon: {
    width: '24px',
    height: '24px',
  },
}))

const CsrfInput = () => {
  const token = document
    .querySelector('meta[name=csrf-token]')
    ?.getAttribute('content')
  return <input type="hidden" name="authenticity_token" value={token ?? ''} />
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
  const theme = useTheme()
  const isDarkMode = theme.palette.type === 'dark'

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

            <ChronicleNavList />
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
            <img
              className={classes.icon}
              src={isDarkMode ? iconGithubWhite : iconGithubBlack}
              aria-hidden={true}
            />
          </ListItemIcon>

          <ListItemText primary="View Source on GitHub" />
        </HtmlLinkListItem>

        <HtmlLinkListItem
          href="https://discord.gg/zmpWyMv"
          onClick={closeCheck}
        >
          <ListItemIcon>
            <img
              className={classes.icon}
              src={isDarkMode ? iconDiscordWhite : iconDiscordBlack}
              aria-hidden={true}
            />
          </ListItemIcon>
          <ListItemText primary="Discuss on Discord" />
        </HtmlLinkListItem>

        <HtmlLinkListItem
          href="https://www.patreon.com/hushnowquietnow"
          onClick={closeCheck}
        >
          <ListItemIcon>
            <img
              className={classes.icon}
              src={isDarkMode ? iconPatreonWhite : iconPatreonBlack}
              aria-hidden={true}
            />
          </ListItemIcon>
          <ListItemText primary="Support on Patreon" />
        </HtmlLinkListItem>

        {authenticated && <NavPanelLogout />}
      </List>
    </ErrorBoundary>
  )
}

export default NavPanel
