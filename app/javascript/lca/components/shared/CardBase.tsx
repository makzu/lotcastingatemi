import { ReactChildren } from 'react'
import { Paper } from '@mui/material'

/** Base element for various Cards (CharacterCard, QcCard, etc) */
const CardBase = ({ children }: { children: ReactChildren }) => {
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
