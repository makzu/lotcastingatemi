import { Drawer, useMediaQuery, type Theme } from '@mui/material'
import { Box } from '@mui/system'

import { drawerWidth } from 'containers/_drawerProperties'
import { getCurrentPlayer } from 'ducks/entities'
import { closeDrawer } from 'features/drawerSlice'
import { useAppDispatch, useAppSelector } from 'hooks'
import NavPanel from './NavPanel'

// Shamelessly stolen from the material-ui drawer demo

const NavPanelWrap = () => {
  const displayName = useAppSelector(
    (state) => getCurrentPlayer(state).display_name,
  )
  const authenticated = useAppSelector((state) => state.session.authenticated)

  const drawerOpen = useAppSelector((state) => state.drawer.open)
  const dispatch = useAppDispatch()
  const close = () => dispatch(closeDrawer())

  const lgAndUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'))

  const Panel = (
    <NavPanel
      authenticated={authenticated}
      displayName={displayName}
      drawerOpen={drawerOpen}
      closeDrawer={close}
    />
  )

  return (
    <Box
      component="nav"
      sx={{ width: { lg: drawerWidth }, flexShrink: { lg: 0 } }}
    >
      {lgAndUp ? (
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', lg: 'block' },
          }}
          open
        >
          {Panel}
        </Drawer>
      ) : (
        <Drawer
          variant="temporary"
          open={drawerOpen}
          onClose={close}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', lg: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
        >
          {Panel}
        </Drawer>
      )}
    </Box>
  )
}

export default NavPanelWrap
