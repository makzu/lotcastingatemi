import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { Drawer, Hidden, type Theme } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

import { closeDrawer } from '@lca/features/drawerSlice'
import { useAppDispatch } from '@lca/hooks/UseAppDispatch'
import { useAppSelector } from '@lca/hooks/UseAppSelector'
import { getCurrentPlayer } from 'ducks/entities'
import { drawerWidth } from '../../containers/_drawerProperties'
import NavPanel from './NavPanel'
import type { State } from 'ducks'
import { compose } from 'recompose'

// Shamelessly stolen from the material-ui drawer demo

const drawerScrollbars = (theme: Theme) => ({
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
  const classes = useStyles()
  const drawerOpen = useAppSelector((state) => state.drawer.open)
  const dispatch = useAppDispatch()
  const close = () => dispatch(closeDrawer())
  const { authenticated, displayName } = props

  const Panel = (
    <NavPanel
      authenticated={authenticated}
      displayName={displayName}
      drawerOpen={drawerOpen}
      closeDrawer={close}
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
      <Hidden mdDown implementation="css">
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
