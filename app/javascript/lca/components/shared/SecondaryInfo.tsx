import type { ReactNode } from 'react'

import { Box } from '@mui/material'

interface Props {
  children: ReactNode
}

const SecondaryInfo = ({ children }: Props) => {
  return (
    <Box component="span" sx={{ color: 'text.secondary', fontSize: '0.75rem' }}>
      {children}
    </Box>
  )
}

export default SecondaryInfo
