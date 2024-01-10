import * as React from 'react'
import { connect } from 'react-redux'

import green from '@material-ui/core/colors/green'
import lightgreen from '@material-ui/core/colors/lightGreen'
import teal from '@material-ui/core/colors/teal'
import { createMuiTheme } from '@material-ui/core/styles'
import { dark, light } from '@material-ui/core/styles/createPalette'
import { ThemeProvider } from '@material-ui/styles'

import { State } from 'ducks'
import { switchTheme } from 'ducks/actions.js'

/* When changing these colors, it's also important to change the theme_color
 * entries in /config/favicon.json from #2e7d32 to the new value,
 * and to re-run `rails g favicon`
 */
const themeCommon = {
  disableScrollbars: false,
  overrides: {
    MuiSelect: {
      selectMenu: {
        // overflow: 'inherit',
      },
    },
  },
}
const themes = {
  dark: createMuiTheme({
    palette: {
      primary: { main: green[900] },
      secondary: { main: teal[400] },
      type: 'dark',
    },
    ...themeCommon,
    typography: {
      caption: {
        color: dark.text.secondary,
      },
    },
  }),
  light: createMuiTheme({
    palette: {
      primary: { main: green[800] },
      secondary: { main: lightgreen[400] },
    },
    ...themeCommon,
    typography: {
      caption: {
        color: light.text.secondary,
      },
    },
  }),
}

interface ExposedProps {
  children: React.ReactNode
}

interface StateProps {
  theme: State['app']['theme']
}

interface DispatchProps {
  change(theme: State['app']['theme'] | string): void
}

interface Props extends ExposedProps, StateProps, DispatchProps {}

const ThemeContainer = ({ theme, children, change }: Props) => {
  React.useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key !== 'theme') {
        return
      }
      change(e.newValue)
    }
    window.addEventListener('storage', handleStorageChange)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [])

  return <ThemeProvider theme={themes[theme]}>{children}</ThemeProvider>
}

const mapStateToProps = (state: State) => ({ theme: state.app.theme })

const enhance = connect(mapStateToProps, { change: switchTheme })

export default enhance(ThemeContainer)
