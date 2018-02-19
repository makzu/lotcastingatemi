import React from 'react'
import PropTypes from 'prop-types'

import Reboot from 'material-ui/Reboot'

import AppBar from 'material-ui/AppBar'

import Drawer from 'material-ui/Drawer'
import Hidden from 'material-ui/Hidden'
import IconButton from 'material-ui/IconButton'
import MenuIcon from 'material-ui-icons/Menu'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'

import { withStyles } from 'material-ui/styles'

import NavPanel from '../components/NavPanel.jsx'

// Shamelessly stolen from the material-ui drawer demo

const drawerWidth = 240

const styles = theme => ({
  appFrame: {
    position: 'relative',
    display: 'flex',
    width: '100%',
    minHeight: '100vh'
  },
  appBar: {
    position: 'absolute',
    marginLeft: drawerWidth,
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`
    }
  },
  navIcon: {
    [theme.breakpoints.up('md')]: {
      display: 'none'
    }
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

    this.state = { drawerOpenMobile: false }

    this.handleDrawerToggle = this.handleDrawerToggle.bind(this)
  }

  handleDrawerToggle() {
    this.setState ({ drawerOpenMobile: !this.state.drawerOpenMobile })
  }

  render() {
    const { children, classes, theme } = this.props

    return(<div className={ classes.appFrame }>
      <Reboot />

      <AppBar className={ classes.appBar } component="header">
        <Toolbar>
          <IconButton
            className={ classes.navIcon }
            onClick={ this.handleDrawerToggle }
            color="inherit"
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="title" color="inherit">
            Lot-Casting Atemi
          </Typography>
        </Toolbar>
      </AppBar>

      <Hidden mdUp>
        <Drawer
          variant="temporary"
          open={ this.state.drawerOpenMobile }
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
    </div>)
  }
}
App.propTypes = {
  children: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
}

export default withStyles(styles, { withTheme: true })(App)
