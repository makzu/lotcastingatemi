import { ListItem, ListItemText, Switch } from '@mui/material'

import { useAppDispatch, useAppSelector } from '@/hooks'
import { switchTheme } from 'features/themeSlice'

const NavPanelThemeSwitch = () => {
  const theme = useAppSelector((state) => state.theme)
  const dispatch = useAppDispatch()
  const action = (theme: Parameters<typeof switchTheme>[0]) =>
    dispatch(switchTheme(theme))

  return (
    <ListItem
      onClick={() => action(theme === 'light' ? 'dark' : 'light')}
      secondaryAction={
        <Switch
          checked={theme === 'dark'}
          onChange={() => action(theme === 'light' ? 'dark' : 'light')}
        />
      }
    >
      <ListItemText
        primary={`Current Theme: ${theme}`}
        style={{ textTransform: 'capitalize' }}
      />
    </ListItem>
  )
}

export default NavPanelThemeSwitch
