import { Box } from '@mui/material'

const BgBox = ({ children }: { children: React.ReactNode }) => (
  <Box sx={{ mr: 1, mt: 1, minWidth: '4.5rem' }}>{children}</Box>
)

export default BgBox
