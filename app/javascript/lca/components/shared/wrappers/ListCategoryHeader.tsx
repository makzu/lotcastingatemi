import { type SxProps, Typography } from '@mui/material'

const ListCategoryHeader = (props: {
  children: React.ReactNode
  noBg?: boolean
  sx?: SxProps
}) => {
  const { children, noBg, sx } = props
  return (
    <Typography
      variant="h5"
      sx={{
        bgcolor: noBg ? 'unset' : 'background.default',
        position: 'sticky',
        top: '64px',
        zIndex: 1,
        ml: -1,
        pl: 1,
        ...sx,
      }}
    >
      {children}
    </Typography>
  )
}

export default ListCategoryHeader
