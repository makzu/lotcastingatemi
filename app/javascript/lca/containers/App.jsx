// @flow
import * as React from 'react'
const { Component } = React
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { compose } from 'recompose'

import CssBaseline from '@material-ui/core/CssBaseline'

import { withStyles } from '@material-ui/core/styles'
import Divider from '@material-ui/core/Divider'
import Drawer from '@material-ui/core/Drawer'
import Hidden from '@material-ui/core/Hidden'
import Typography from '@material-ui/core/Typography'

import LoadingIndicator from 'components/generic/LoadingIndicator.jsx'
import LcaHeader from 'components/header/header.jsx'
import NavPanel from 'components/nav/navPanel.jsx'
import ErrorBoundary from 'containers/ErrorBoundary.jsx'
import { toggleDrawer } from 'ducks/actions.js'
import VERSION from '../VERSION'

// Shamelessly stolen from the material-ui drawer demo

const scrollbars = theme => ({
  '::-webkit-scrollbar': {
    height: '8px',
    backgroundColor: theme.palette.background.default,
    width: '8px',
  },
  '::-webkit-scrollbar-thumb': {
    backgroundColor: theme.palette.divider,
  },
})

const drawerScrollbars = theme => ({
  '&::-webkit-scrollbar': {
    backgroundColor: theme.palette.background.paper,
  },
})

const drawerWidth = 240
const styles = theme => ({
  '@global': theme.disableScrollbars ? {} : scrollbars(theme),
  appFrame: {
    position: 'relative',
    display: 'flex',
    width: '100%',
    minHeight: '100vh',
    overflowY: 'auto',
  },
  drawer: {
    [theme.breakpoints.up('md')]: {
      height: '100%',
    },
  },
  drawerPaper: {
    width: 250,
    [theme.breakpoints.up('md')]: {
      display: 'block',
      width: drawerWidth,
      // position: 'relative',
      minHeight: '100vh',
      height: '100%',
      position: 'fixed',
      overflowY: 'auto',
    },
    ...(theme.disableScrollbars ? {} : drawerScrollbars(theme)),
  },
  content: {
    backgroundColor: theme.palette.background.default,
    width: '100%',
    padding: theme.spacing.unit * 3,
    height: 'calc(100% - 56px)',
    marginTop: 56,
    [theme.breakpoints.up('md')]: {
      height: 'calc(100% - 64px)',
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      marginTop: 64,
    },
  },
  footer: {
    marginTop: theme.spacing.unit * 6,
    textAlign: 'center',
  },
  footerDivider: {
    marginBottom: theme.spacing.unit * 2,
    marginLeft: theme.spacing.unit * 8,
    marginRight: theme.spacing.unit * 8,
  },
  footerText: {
    display: 'inline',
  },
})

export type Props = {
  drawerOpen: boolean,
  toggleDrawer: Function,
  children: React.Node,
  classes: Object,
}

class App extends Component<Props> {
  handleDrawerToggle = () => {
    this.props.toggleDrawer()
  }

  render() {
    const { children, drawerOpen, classes } = this.props

    return (
      <div className={classes.appFrame}>
        <CssBaseline />

        <LcaHeader />

        <Hidden mdUp>
          <Drawer
            variant="temporary"
            open={drawerOpen}
            classes={{
              paper: classes.drawerPaper,
            }}
            onClose={this.handleDrawerToggle}
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
              docked: classes.drawer,
              paper: classes.drawerPaper,
            }}
          >
            <NavPanel />
          </Drawer>
        </Hidden>

        <main className={classes.content}>
          <ErrorBoundary>{children}</ErrorBoundary>

          <footer className={classes.footer}>
            <Divider className={classes.footerDivider} />
            <div>
              <Typography
                variant="caption"
                className={classes.footerText}
                component="a"
                href={`https://github.com/makzu/lotcastingatemi/blob/master/CHANGELOG.md#${VERSION}`}
              >
                {VERSION}
              </Typography>
            </div>

            <Typography variant="caption" className={classes.footerText}>
              Exalted is &copy; White Wolf AB and Onyx Path.
            </Typography>

            <div>
              <Typography
                variant="caption"
                component={Link}
                to="/privacy"
                className={classes.footerText}
              >
                Privacy Policy / Legal Notice
              </Typography>
            </div>
          </footer>
        </main>

        <LoadingIndicator />
      </div>
    )
  }
}

const mapStateToProps = state => ({ drawerOpen: state.app.drawerOpen })

export default compose(
  withRouter,
  withStyles(styles, { withTheme: true }),
  connect(
    mapStateToProps,
    { toggleDrawer }
  )
)(App)
