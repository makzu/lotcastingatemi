import { Typography } from '@mui/material'

const PoolDisplayNumericValue = (props: { children: React.ReactNode }) => {
  const { children } = props
  return (
    <Typography
      variant="body2"
      component="div"
      sx={{ fontSize: '1.25rem', lineHeight: 'inherit' }}
    >
      {children}
    </Typography>
  )
}

export default PoolDisplayNumericValue
