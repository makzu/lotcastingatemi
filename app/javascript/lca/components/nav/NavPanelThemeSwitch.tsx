import {
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Switch,
} from '@mui/material'

import { switchTheme } from 'features/themeSlice'
import { useAppDispatch, useAppSelector } from 'hooks'

const NavPanelThemeSwitch = () => {
  const theme = useAppSelector((state) => state.theme)
  const dispatch = useAppDispatch()
  const action = (theme) => dispatch(switchTheme(theme))

  return (
    <ListItem
      button
      onClick={() => action(theme === 'light' ? 'dark' : 'light')}
    >
      <ListItemText
        primary={`Current Theme: ${theme}`}
        style={{ textTransform: 'capitalize' }}
      />
      <ListItemSecondaryAction>
        <Switch
          checked={theme === 'dark'}
          onChange={() => action(theme === 'light' ? 'dark' : 'light')}
        />
      </ListItemSecondaryAction>
    </ListItem>
  )
}

export default NavPanelThemeSwitch
