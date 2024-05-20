import { Typography } from '@mui/material'

interface props {
  children: React.ReactNode
}

const ListCategoryHeader = ({ children }: props) => {
  return (
    <Typography
      variant="h5"
      position="sticky"
      top="64px"
      sx={{ bgcolor: 'background.default', zIndex: 1, ml: -1, pl: 1 }}
    >
      {children}
    </Typography>
  )
}

export default ListCategoryHeader
