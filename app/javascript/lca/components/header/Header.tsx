import { Suspense } from 'react'
import { useTranslation } from 'react-i18next'
import { Route, Switch } from 'react-router-dom'

import { AppBar, Toolbar, Typography } from '@mui/material'

import { drawerWidth } from 'containers/_drawerProperties'
import BattlegroupHeader from './BattlegroupHeader'
import CharacterHeader from './CharacterHeader'
import ChronicleHeader from './ChronicleHeader'
import LcaDrawerButton from './DrawerButton'
import QcHeader from './QcHeader'

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
  return (
    <AppBar
      component="header"
      enableColorOnDark
      sx={{
        transition: (theme) => theme.transitions.create('width'),
        width: { lg: `calc(100% - ${drawerWidth}px)` },
        ml: { lg: `${drawerWidth}px` },
      }}
    >
      <Suspense fallback={<div />}>
        <Switch>
          <Route path="/chronicles/:id">
            <ChronicleHeader />
          </Route>
          <Route path="/characters/:id">
            <CharacterHeader />
          </Route>
          <Route path="/qcs/:id">
            <QcHeader />
          </Route>
          <Route path="/battlegroups/:id">
            <BattlegroupHeader />
          </Route>
          <Route path="/characters">
            <GenericHeader />
          </Route>
          <Route>
            <GenericHeader />
          </Route>
        </Switch>
      </Suspense>
    </AppBar>
  )
}

export default LcaHeader
