import { PropsWithChildren, useEffect, useMemo } from 'react'

import { useMediaQuery } from '@mui/material'
import { green, lightGreen as lightgreen, teal } from '@mui/material/colors'
import {
  createTheme,
  StyledEngineProvider,
  Theme,
  ThemeProvider,
} from '@mui/material/styles'

import { switchTheme } from 'features/themeSlice'
import { useAppDispatch, useAppSelector } from 'hooks'

declare module '@mui/styles/defaultTheme' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface, no-unused-vars
  interface DefaultTheme extends Theme {}
}

const ThemeContainer = ({ children }: PropsWithChildren<null>) => {
  const dispatch = useAppDispatch()
  const themeSetting = useAppSelector((state) => state.theme)
  const defaultPreference = useMediaQuery('(prefers-color-scheme: dark)')
    ? 'dark'
    : 'light'

  // Respond to changes to the theme in localstorage in case the theme is changed in another tab
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (
        e.key === 'theme' &&
        e.newValue !== themeSetting &&
        (e.newValue === 'light' || e.newValue === 'dark')
      ) {
        dispatch(switchTheme(e.newValue))
      }
    }
    window.addEventListener('storage', handleStorageChange)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [dispatch, themeSetting])

  // Set a default theme based on whether the user prefers light or dark mode
  useEffect(() => {
    if (themeSetting == null) {
      dispatch(switchTheme(defaultPreference))
    }
  }, [defaultPreference, dispatch, themeSetting])

  const theme = useMemo(() => {
    /* When changing these colors, it's also important to change the theme_color
     * entries in /config/favicon.json from #2e7d32 to the new value,
     * and to re-run `rails g favicon`
     */
    return createTheme({
      components: {
        MuiTextField: {
          defaultProps: {
            variant: 'standard',
          },
        },
      },
      palette:
        (themeSetting || defaultPreference) === 'dark'
          ? {
              mode: 'dark',
              primary: { main: green[900] },
              secondary: { main: teal[400] },
            }
          : {
              mode: 'light',
              primary: { main: green[800] },
              secondary: { main: lightgreen[400] },
            },
    })
  }, [defaultPreference, themeSetting])

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </StyledEngineProvider>
  )
}

export default ThemeContainer
