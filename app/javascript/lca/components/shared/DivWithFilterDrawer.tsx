import { makeStyles } from '@material-ui/core/styles'

import { drawerWidth } from '@lca/containers/_drawerProperties'

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.up('xl')]: {
      paddingRight: drawerWidth,
    },
  },
}))

const DivWithFilterDrawer = ({ children }: { children: React.ReactNode }) => {
  const classes = useStyles()
  return <div className={classes.root}>{children}</div>
}

export default DivWithFilterDrawer
