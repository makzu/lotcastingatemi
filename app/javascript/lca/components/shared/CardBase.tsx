import type { ReactNode } from 'react'
import { Paper } from '@mui/material'

/** Base element for various Cards (CharacterCard, QcCard, etc) */
const CardBase = ({ children }: { children: ReactNode }) => {
  return (
    <Paper
      sx={{
        height: '100%',
        padding: 2,
        position: 'relative',
      }}
    >
      {children}
    </Paper>
  )
}

export default CardBase
