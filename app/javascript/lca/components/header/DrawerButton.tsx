import IconButton from '@material-ui/core/IconButton'
import type { Theme } from '@material-ui/core/styles'
import MenuIcon from '@material-ui/icons/Menu'
import { makeStyles } from '@material-ui/styles'

import { toggleDrawer } from '@lca/features/drawerSlice'
import { useAppDispatch } from '@lca/hooks/UseAppDispatch'

const useStyles = makeStyles((theme: Theme) => ({
  drawerButton: {
    [theme.breakpoints.up('lg')]: {
      display: 'none',
    },
  },
}))

const LcaDrawerButton = () => {
  const dispatch = useAppDispatch()
  const classes = useStyles()
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

export default LcaDrawerButton
