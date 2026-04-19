import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Switch,
} from '@material-ui/core'

import { State } from 'ducks'
import { switchTheme } from 'ducks/actions'

const NavPanelThemeSwitch = () => {
  const theme = useSelector((state: State) => state.app.theme)
  const dispatch = useDispatch()

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
