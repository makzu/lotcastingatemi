import * as React from 'react'

import { Theme } from '@mui/material'
import { makeStyles } from '@mui/styles'

import { drawerWidth } from 'containers/_drawerProperties'

const useStyles = makeStyles((theme: Theme) => ({
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
