import * as React from 'react'
import { connect } from 'react-redux'

import IconButton from '@material-ui/core/IconButton'
import { withStyles } from '@material-ui/core/styles'
import MenuIcon from '@material-ui/icons/Menu'

import { toggleDrawer  } from 'ducks/actions.js'

const styles = theme => ({
  drawerButton: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
})

const LcaDrawerButton = ({
  classes,
  toggle,
}: {
  classes: any,
  toggle(): void,
}) => (
  <IconButton
    className={classes.drawerButton}
    onClick={toggle}
    color="inherit"
  >
    <MenuIcon />
  </IconButton>
)

export default withStyles(styles)(
  connect(
    null,
    { toggle: toggleDrawer }
  )(LcaDrawerButton)
)
