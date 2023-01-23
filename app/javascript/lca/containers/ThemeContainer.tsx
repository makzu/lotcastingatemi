import { green, lightGreen as lightgreen, teal } from '@mui/material/colors'
import {
  ThemeProvider,
  Theme,
  StyledEngineProvider,
  createTheme,
} from '@mui/material/styles'

import { switchTheme } from 'features/themeSlice'
import { ReactChildren, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from 'hooks'

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
})

const lightTheme = createTheme({
  ...themeCommon,
  palette: {
    mode: 'light',
    primary: { main: green[800] },
    secondary: { main: lightgreen[400] },
  },
})

const ThemeContainer = ({ children }: { children: ReactChildren }) => {
  const dispatch = useAppDispatch()
  const theme = useAppSelector((state) => state.theme)

  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key !== 'theme') {
        return
      }
      if (
        e.newValue !== theme &&
        (e.newValue === 'light' || e.newValue === 'dark')
      ) {
        dispatch(switchTheme(e.newValue))
      }
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
