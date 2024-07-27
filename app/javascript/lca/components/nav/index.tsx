import { Box, Drawer, useMediaQuery, type Theme } from '@mui/material'

import { drawerWidth } from '@/containers/_drawerProperties'
import { useGetCurrentPlayerQuery } from '@/features/player/store'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { closeDrawer } from 'features/drawerSlice'
import NavPanel from './NavPanel'

// Shamelessly stolen from the material-ui drawer demo

const NavPanelWrap = () => {
  const { data: player } = useGetCurrentPlayerQuery()
  const displayName = player?.display_name ?? 'Error'

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
          sx={{ display: { xs: 'none', lg: 'block' } }}
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
