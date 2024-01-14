import type { ReactNode } from 'react'
import { drawerWidth } from '@/containers/_drawerProperties'

import { Box } from '@mui/material'

const DivWithFilterDrawer = ({ children }: { children: ReactNode }) => {
  return <Box sx={{ xl: { paddingRight: drawerWidth } }}>{children}</Box>
}

export default DivWithFilterDrawer
