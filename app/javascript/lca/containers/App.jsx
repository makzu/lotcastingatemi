import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import Reboot from 'material-ui/Reboot'

import { withStyles } from 'material-ui/styles'
import Drawer from 'material-ui/Drawer'
import Hidden from 'material-ui/Hidden'

import LcaHeader from '../components/header/header.jsx'
import NavPanel from '../components/NavPanel.jsx'
import { toggleDrawer } from '../ducks/actions.js'

// Shamelessly stolen from the material-ui drawer demo

const drawerWidth = 240
const styles = theme => ({
  appFrame: {
    position: 'relative',
    display: 'flex',
    width: '100%',
    minHeight: '100vh'
  },
  drawerPaper: {
    width: 250,
    [theme.breakpoints.up('md')]: {
      width: drawerWidth,
      position: 'relative',
      minHeight: '100vh'
    }
  },
  content: {
    backgroundColor: theme.palette.background.default,
    width: '100%',
    padding: theme.spacing.unit * 3,
    height: 'calc(100% - 56px)',
    marginTop: 56,
    [theme.breakpoints.up('sm')]: {
      height: 'calc(100% - 64px)',
      marginTop: 64
    }
  }
})

class App extends React.Component {
  constructor(props) {
    super(props)

    this.handleDrawerToggle = this.handleDrawerToggle.bind(this)
  }

  handleDrawerToggle() {
    this.props.toggleDrawer()
  }

  render() {
    const { children, classes } = this.props

    return <div className={ classes.appFrame }>
      <Reboot />

      <LcaHeader />

      <Hidden mdUp>
        <Drawer
          variant="temporary"
          open={ this.props.drawerOpen }
          classes={{
            paper: classes.drawerPaper
          }}
          onClose={ this.handleDrawerToggle }
          ModalProps={{ keepMounted: true }}
        >
          <NavPanel />
        </Drawer>
      </Hidden>
      <Hidden smDown implementation="css">
        <Drawer
          variant="permanent"
          open
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <NavPanel />
        </Drawer>
      </Hidden>

      <main className={classes.content}>
        { children }
      </main>
    </div>
  }
}
App.propTypes = {
  drawerOpen: PropTypes.bool.isRequired,
  toggleDrawer: PropTypes.func.isRequired,
  children: PropTypes.object.isRequired,
  classes: PropTypes.object,
}

function mapStateToProps(state) {
  const drawerOpen = state.app.drawerOpen
  return {
    drawerOpen,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    toggleDrawer: () => {
      dispatch(toggleDrawer())
    },
  }
}

export default withStyles(styles, { withTheme: true })(
  withRouter(
    connect(mapStateToProps, mapDispatchToProps)(
      App
    )
  )
)
