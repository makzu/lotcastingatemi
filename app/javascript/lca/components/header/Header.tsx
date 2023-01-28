import { Suspense } from 'react'
import { useTranslation } from 'react-i18next'
import { Route, Routes } from 'react-router-dom'

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
        <Routes>
          <Route path="/chronicles/:id/*" element={<ChronicleHeader />} />
          <Route path="/characters/:id/*" element={<CharacterHeader />} />
          <Route path="/qcs/:id/*" element={<QcHeader />} />
          <Route path="/battlegroups/:id/*" element={<BattlegroupHeader />} />
          <Route path="*" element={<GenericHeader />} />
        </Routes>
      </Suspense>
    </AppBar>
  )
}

export default LcaHeader
