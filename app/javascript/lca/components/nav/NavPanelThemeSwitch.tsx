import {
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Switch,
} from '@material-ui/core'

import { switchTheme } from '@lca/features/themeSlice.ts'
import { useAppDispatch } from '@lca/hooks/UseAppDispatch.ts'
import { useAppSelector } from '@lca/hooks/UseAppSelector.ts'

const NavPanelThemeSwitch = () => {
  const theme = useAppSelector((state) => state.theme)
  const dispatch = useAppDispatch()

  return (
    <ListItem
      button
      onClick={() =>
        dispatch(switchTheme(theme === 'light' ? 'dark' : 'light'))
      }
    >
      <ListItemText
        primary={`Current Theme: ${theme}`}
        style={{ textTransform: 'capitalize' }}
      />
      <ListItemSecondaryAction>
        <Switch
          checked={theme === 'dark'}
          onChange={() =>
            dispatch(switchTheme(theme === 'light' ? 'dark' : 'light'))
          }
        />
      </ListItemSecondaryAction>
    </ListItem>
  )
}

export default NavPanelThemeSwitch
