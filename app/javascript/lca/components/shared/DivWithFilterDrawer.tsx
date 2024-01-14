import type { ReactNode } from 'react'
import Box from '@mui/material/Box'

import { drawerWidth } from 'containers/_drawerProperties'

const DivWithFilterDrawer = ({ children }: { children: ReactNode }) => {
  return <Box sx={{ xl: { paddingRight: drawerWidth } }}>{children}</Box>
}

export default DivWithFilterDrawer
