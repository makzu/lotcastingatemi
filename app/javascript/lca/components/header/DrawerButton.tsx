import * as React from 'react'
import { useDispatch } from 'react-redux'

import IconButton from '@material-ui/core/IconButton'
import { Theme, withStyles } from '@material-ui/core/styles'
import MenuIcon from '@material-ui/icons/Menu'

import { toggleDrawer } from 'ducks/actions'
import { createStyles, WithStyles } from '@material-ui/styles'

const styles = (theme: Theme) =>
  createStyles({
    drawerButton: {
      [theme.breakpoints.up('lg')]: {
        display: 'none',
      },
    },
  })

const LcaDrawerButton = ({ classes }: WithStyles<typeof styles>) => {
  const dispatch = useDispatch()
  return (
    <IconButton
      className={classes.drawerButton}
      onClick={() => dispatch(toggleDrawer())}
      color="inherit"
    >
      <MenuIcon />
    </IconButton>
  )
}

const EnhancedLcaDrawerButton = withStyles(styles)(LcaDrawerButton)
export default EnhancedLcaDrawerButton
