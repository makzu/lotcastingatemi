import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'recompose'

import { Drawer, Hidden, Theme } from '@mui/material'
import { makeStyles } from '@mui/styles'

import { State } from 'ducks'
import { getCurrentPlayer } from 'ducks/entities'
import { closeDrawer } from 'features/drawerSlice'
import { drawerWidth } from '../../containers/_drawerProperties'
import NavPanel from './NavPanel'
import { useAppDispatch, useAppSelector } from 'hooks'

// Shamelessly stolen from the material-ui drawer demo

const drawerScrollbars = (theme) => ({
  '&::-webkit-scrollbar': {
    backgroundColor: theme.palette.background.paper,
  },
})

const useStyles = makeStyles(
  (theme: Theme & { disableScrollbars: boolean }) => ({
    drawer: {
      [theme.breakpoints.up('md')]: {
        height: '100%',
      },
    },
    drawerPaper: {
      width: drawerWidth + 10,
      [theme.breakpoints.up('lg')]: {
        display: 'block',
        height: '100%',
        minHeight: '100vh',
        overflowY: 'auto',
        position: 'fixed',
        width: drawerWidth,
      },
      ...(theme.disableScrollbars ? {} : drawerScrollbars(theme)),
    },
  }),
)

interface StateProps {
  authenticated: State['session']['authenticated']
  displayName: string
}

interface Props extends StateProps {}

const NavPanelWrap = (props: Props) => {
  const classes = useStyles({})
  const { authenticated, displayName } = props

  const drawerOpen = useAppSelector((state) => state.drawer.open)
  const dispatch = useAppDispatch()

  const Panel = (
    <NavPanel
      authenticated={authenticated}
      displayName={displayName}
      drawerOpen={drawerOpen}
      closeDrawer={() => dispatch(closeDrawer())}
    />
  )

  return (
    <>
      <Hidden lgUp>
        <Drawer
          variant="temporary"
          open={drawerOpen}
          classes={{
            paper: classes.drawerPaper,
          }}
          onClose={close}
          ModalProps={{ keepMounted: true }}
        >
          {Panel}
        </Drawer>
      </Hidden>
      <Hidden lgDown implementation="css">
        <Drawer
          variant="permanent"
          open
          classes={{
            docked: classes.drawer,
            paper: classes.drawerPaper,
          }}
        >
          {Panel}
        </Drawer>
      </Hidden>
    </>
  )
}

const mapState = (state: State): StateProps => ({
  authenticated: state.session.authenticated,
  displayName: getCurrentPlayer(state).display_name || 'nobody',
})

export default compose<Props, {}>(withRouter, connect(mapState))(NavPanelWrap)
