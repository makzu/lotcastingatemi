import * as React from 'react'
import { useTranslation } from 'react-i18next'
import { Route, Switch } from 'react-router-dom'

import { AppBar, Toolbar, Typography } from '@mui/material'
import { Theme } from '@mui/styles'
import { makeStyles } from '@mui/styles'

import { drawerWidth } from 'containers/_drawerProperties'
import BattlegroupHeader from './BattlegroupHeader'
import CharacterHeader from './CharacterHeader'
import ChronicleHeader from './ChronicleHeader'
import LcaDrawerButton from './DrawerButton'
import QcHeader from './QcHeader'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    marginLeft: drawerWidth,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('lg')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
}))

export const GenericHeader = () => {
  const [t] = useTranslation()

  return (
    <Toolbar>
      <LcaDrawerButton />

      <Typography variant="h6" color="inherit">
        {t('app name')}
      </Typography>
    </Toolbar>
  )
}

const LcaHeader = () => {
  const classes = useStyles({})

  return (
    <AppBar className={classes.root} component="header" enableColorOnDark>
      <React.Suspense fallback={<div />}>
        <Switch>
          <Route path="/chronicles/:id" component={ChronicleHeader} />
          <Route path="/characters/:id" component={CharacterHeader} />
          <Route path="/qcs/:id" component={QcHeader} />
          <Route path="/battlegroups/:id" component={BattlegroupHeader} />
          <Route path="/characters" component={GenericHeader} />
          <Route component={GenericHeader} />
        </Switch>
      </React.Suspense>
    </AppBar>
  )
}

export default LcaHeader
