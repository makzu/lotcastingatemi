// @flow
import React from 'react'
import { connect } from 'react-redux'

import { withStyles } from 'material-ui/styles'
import IconButton from 'material-ui/IconButton'
import MenuIcon from '@material-ui/icons/Menu'

import { toggleDrawer } from 'ducks/actions.js'

const styles = theme => ({
  drawerButton: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
})

const LcaDrawerButton = ({
  classes,
  toggleDrawer,
}: {
  toggleDrawer: Function,
  classes: Object,
}) => (
  <IconButton
    className={classes.drawerButton}
    onClick={toggleDrawer}
    color="inherit"
  >
    <MenuIcon />
  </IconButton>
)

export default withStyles(styles)(
  connect(null, { toggleDrawer })(LcaDrawerButton)
)
