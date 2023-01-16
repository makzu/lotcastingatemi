import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'

import { toggleDrawer } from 'features/drawerSlice'
import { useAppDispatch } from 'hooks'

const LcaDrawerButton = () => {
  const dispatch = useAppDispatch()

  return (
    <IconButton
      sx={(theme) => ({ [theme.breakpoints.up('lg')]: { display: 'none' } })}
      onClick={() => dispatch(toggleDrawer())}
      color="inherit"
      size="large"
    >
      <MenuIcon />
    </IconButton>
  )
}

export default LcaDrawerButton
