import { connect } from 'react-redux'

import IconButton from '@mui/material/IconButton'
import withStyles from '@mui/styles/withStyles'
import MenuIcon from '@mui/icons-material/Menu'

import { toggleDrawer } from 'ducks/actions.js'

const styles = (theme) => ({
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
  <IconButton
    className={classes.drawerButton}
    onClick={toggle}
    color="inherit"
    size="large"
  >
    <MenuIcon />
  </IconButton>
)

export default withStyles(styles)(
  connect(null, { toggle: toggleDrawer })(LcaDrawerButton),
)
