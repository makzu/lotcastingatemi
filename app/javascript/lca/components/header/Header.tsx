import { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'

import { AppBar, Toolbar, Typography } from '@mui/material'

import { drawerWidth } from '@/containers/_drawerProperties'
import { BattlegroupSheetHeader } from '@/features/battlegroup/sheet/'
import CharacterHeader from './CharacterHeader'
import ChronicleHeader from './ChronicleHeader'
import LcaDrawerButton from './DrawerButton'
import { QcSheetHeader } from '@/features/qc/sheet/'

export const GenericHeader = () => {
  return (
    <Toolbar>
      <LcaDrawerButton />
      <Typography variant="h6" sx={{ color: 'inherit' }}>
        Lot-Casting Atemi
      </Typography>
    </Toolbar>
  )
}

const LcaHeader = () => {
  return (
    <AppBar
      component="header"
      enableColorOnDark
      sx={(theme) => ({
        transition: theme.transitions.create('width'),
        width: { lg: `calc(100% - ${drawerWidth}px)` },
        ml: { lg: `${drawerWidth}px` },
        pl: { lg: 3 },
      })}
    >
      <Suspense fallback={<GenericHeader />}>
        <Routes>
          <Route path="/chronicles/:id/*" element={<ChronicleHeader />} />
          <Route path="/characters/:id/*" element={<CharacterHeader />} />
          <Route path="/qcs/:id/*?" element={<QcSheetHeader />} />
          <Route
            path="/battlegroups/:id/*"
            element={<BattlegroupSheetHeader />}
          />
          <Route path="*" element={<GenericHeader />} />
        </Routes>
      </Suspense>
    </AppBar>
  )
}

export default LcaHeader
