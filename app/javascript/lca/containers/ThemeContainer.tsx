import { useDispatch } from 'react-redux'

import {
  ThemeProvider,
  Theme,
  StyledEngineProvider,
  createTheme,
} from '@mui/material/styles'
import { green, lightGreen as lightgreen, teal } from '@mui/material/colors'
// import { dark, light } from '@mui/material/styles/createPalette'

import { switchTheme } from 'ducks/app'
import { ReactChildren, useEffect } from 'react'
import { useAppSelector } from 'hooks'

declare module '@mui/styles/defaultTheme' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}

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

const darkTheme = createTheme({
  ...themeCommon,
  palette: {
    mode: 'dark',
    primary: { main: green[900] },
    secondary: { main: teal[400] },
  },
  // typography: {
  //   caption: {
  //     color: dark.text.secondary,
  //   },
  // },
})

const lightTheme = createTheme({
  ...themeCommon,
  palette: {
    mode: 'light',
    primary: { main: green[800] },
    secondary: { main: lightgreen[400] },
  },
  // typography: {
  //   caption: {
  //     color: light.text.secondary,
  //   },
  // },
})

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

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme === 'dark' ? darkTheme : lightTheme}>
        {children}
      </ThemeProvider>
    </StyledEngineProvider>
  )
}

export default ThemeContainer
