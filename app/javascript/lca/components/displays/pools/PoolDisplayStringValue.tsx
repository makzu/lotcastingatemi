import { Typography } from '@mui/material'

const PoolDisplayStringValue = (props: { children: React.ReactNode }) => {
  const { children } = props
  return (
    <Typography
      variant="body2"
      component="div"
      sx={{
        fontSize: '1.125rem',
        lineHeight: 'inherit',
        textTransform: 'capitalize',
      }}
    >
      {children}
    </Typography>
  )
}

export default PoolDisplayStringValue
