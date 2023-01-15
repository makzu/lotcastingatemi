import { useDispatch } from 'react-redux'

import green from '@material-ui/core/colors/green'
import lightgreen from '@material-ui/core/colors/lightGreen'
import teal from '@material-ui/core/colors/teal'
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { dark, light } from '@material-ui/core/styles/createPalette'

import { switchTheme } from 'ducks/app'
import { ReactChildren, useEffect } from 'react'
import { useAppSelector } from 'hooks'

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

const ThemeContainer = ({ children }: { children: ReactChildren }) => {
  const dispatch = useDispatch()
  const theme = useAppSelector((state) => state.app.theme)
  const change = dispatch(switchTheme)

  useEffect(() => {
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

export default ThemeContainer
