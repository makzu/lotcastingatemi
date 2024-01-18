import { Typography } from '@mui/material'

const DisplayLabel = ({ children }: { children: React.ReactNode }) => {
  return (
    <Typography
      variant="body1"
      sx={{ fontSize: '0.75rem', fontWeight: 500, opacity: 0.7 }}
    >
      {children}
    </Typography>
  )
}

export default DisplayLabel
