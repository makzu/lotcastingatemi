import type { ReactNode } from 'react'

import { Drawer, type Theme, useMediaQuery } from '@mui/material'
import { makeStyles, useTheme } from '@mui/styles'

import { drawerWidth } from '@/containers/_drawerProperties'

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
  children: ReactNode
  open: boolean
  onClose(): void
}

const ResponsiveFilterDrawer = ({ children, open, onClose }: Props) => {
  const theme = useTheme()
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
