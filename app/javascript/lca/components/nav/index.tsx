import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'recompose'

import { Drawer, Hidden, Theme } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

import { State } from 'ducks'
import { closeDrawer } from 'ducks/actions.js'
import { getCurrentPlayer } from 'ducks/entities'
import { drawerWidth } from '../../containers/_drawerProperties'
import NavPanel from './NavPanel'

// Shamelessly stolen from the material-ui drawer demo

const drawerScrollbars = theme => ({
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
  })
)

interface StateProps {
  authenticated: State['session']['authenticated']
  displayName: string
  drawerOpen: State['app']['drawerOpen']
}
interface DispatchProps {
  close(): void
}
interface Props extends StateProps, DispatchProps {}

const NavPanelWrap = (props: Props) => {
  const classes = useStyles({})
  const { authenticated, drawerOpen, displayName, close } = props

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
  drawerOpen: state.app.drawerOpen,
})

export default compose<Props, {}>(
  withRouter,
  connect(
    mapState,
    { close: closeDrawer }
  )
)(NavPanelWrap)
