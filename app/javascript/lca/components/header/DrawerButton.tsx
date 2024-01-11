import * as React from 'react'
import { connect } from 'react-redux'

import IconButton from '@material-ui/core/IconButton'
import { Theme, withStyles } from '@material-ui/core/styles'
import MenuIcon from '@material-ui/icons/Menu'

import { toggleDrawer } from 'ducks/actions'

const styles = (theme: Theme) => ({
  drawerButton: {
    [theme.breakpoints.up('lg')]: {
      display: 'none',
    },
  },
})

const LcaDrawerButton = ({
  classes,
  toggle,
}: {
  classes: any
  toggle(): void
}) => (
  <IconButton className={classes.drawerButton} onClick={toggle} color="inherit">
    <MenuIcon />
  </IconButton>
)

export default withStyles(styles)(
  connect(null, { toggle: toggleDrawer })(LcaDrawerButton),
)
