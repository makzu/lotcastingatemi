import { type ReactNode, useEffect } from 'react'

import green from '@material-ui/core/colors/green'
import lightgreen from '@material-ui/core/colors/lightGreen'
import teal from '@material-ui/core/colors/teal'
import { createTheme } from '@material-ui/core/styles'
import { dark, light } from '@material-ui/core/styles/createPalette'
import { ThemeProvider } from '@material-ui/styles'

import { switchTheme } from '@lca/features/themeSlice'
import useAppDispatch from '@lca/hooks/UseAppDispatch'
import { useAppSelector } from '@lca/hooks/UseAppSelector'
import type { RootState } from '@lca/store'

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
  dark: createTheme({
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
  light: createTheme({
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

interface Props {
  children: ReactNode
}

const ThemeContainer = ({ children }: Props) => {
  const theme = useAppSelector((state) => state.theme)
  const dispatch = useAppDispatch()

  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key !== 'theme') {
        return
      }
      if (e.newValue !== theme) {
        dispatch(switchTheme(e.newValue as RootState['theme']))
      }
    }
    window.addEventListener('storage', handleStorageChange)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [dispatch, theme])

  return <ThemeProvider theme={themes[theme]}>{children}</ThemeProvider>
}

export default ThemeContainer
