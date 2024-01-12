import { ReactNode } from 'react'

import Paper from '@mui/material/Paper'

const style = {
  padding: 2,
  height: '100%',
  position: 'relative',
}

const BlockPaper = ({ children }: { children: ReactNode }) => {
  return <Paper sx={style}>{children}</Paper>
}

export default BlockPaper
