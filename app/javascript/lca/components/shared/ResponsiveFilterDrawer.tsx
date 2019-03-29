import * as React from 'react'

import { Drawer, Theme } from '@material-ui/core'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { makeStyles, useTheme } from '@material-ui/styles'

import { drawerWidth } from 'containers/_drawerProperties'

const useStyles = makeStyles((theme: Theme) => ({
  drawer: {
    width: drawerWidth,
    [theme.breakpoints.up('xl')]: {
      zIndex: theme.zIndex.appBar - 200,
    },
  },
  paper: {
    padding: theme.spacing(2),
    width: drawerWidth,
    [theme.breakpoints.up('xl')]: {
      zIndex: theme.zIndex.appBar - 100,
    },
  },
  toolbar: theme.mixins.toolbar,
}))

interface Props {
  children: React.ReactNode
  open: boolean
  onClose(): void
}

const ResponsiveFilterDrawer = ({ children, open, onClose }: Props) => {
  const theme = useTheme() as any
  const isXL = useMediaQuery(theme.breakpoints.up('xl'))

  const classes = useStyles()

  return (
    <Drawer
      variant={isXL ? 'permanent' : 'temporary'}
      anchor="right"
      className={classes.drawer}
      classes={{ paper: classes.paper }}
      open={open}
      onClose={onClose}
    >
      {isXL && <div className={classes.toolbar} />}
      {children}
    </Drawer>
  )
}

export default ResponsiveFilterDrawer
