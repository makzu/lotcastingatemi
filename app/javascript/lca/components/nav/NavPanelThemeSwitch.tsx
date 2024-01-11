import * as React from 'react'
import { connect } from 'react-redux'

import {
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Switch,
} from '@material-ui/core'

import { State } from 'ducks'
import { switchTheme } from 'ducks/actions'

const NavPanelThemeSwitch = ({
  theme,
  action,
}: {
  theme: 'light' | 'dark'
  action: typeof switchTheme
}) => {
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

const mapState = (state: State) => ({
  theme: state.app.theme,
})

export default connect(mapState, { action: switchTheme })(NavPanelThemeSwitch)
