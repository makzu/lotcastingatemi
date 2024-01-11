import * as React from 'react'
import { Link } from 'react-router-dom'

import { CssBaseline, Divider, Theme, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

import LoadingIndicator from 'components/generic/LoadingIndicator'
import LcaHeader from 'components/header/Header'
import NavPanel from 'components/nav/'
import ErrorBoundary from 'containers/ErrorBoundary'
import VERSION from '../VERSION'
import { drawerWidth } from './_drawerProperties'

// Shamelessly stolen from the material-ui drawer demo

const scrollbars = (theme: Theme) => ({
  '::-webkit-scrollbar': {
    backgroundColor: theme.palette.background.default,
    height: '8px',
    width: '8px',
  },
  '::-webkit-scrollbar-thumb': {
    backgroundColor: theme.palette.divider,
  },
})

const useStyles = makeStyles((theme: Theme) => ({
  '@global': theme.disableScrollbars ? {} : scrollbars(theme),
  appFrame: {
    display: 'flex',
    minHeight: '100vh',
    overflowY: 'auto',
    position: 'relative',
    width: '100%',
  },
  content: {
    [theme.breakpoints.up('lg')]: {
      height: 'calc(100% - 64px)',
      marginLeft: drawerWidth,
      marginTop: 64,
      width: `calc(100% - ${drawerWidth}px)`,
    },
    backgroundColor: theme.palette.background.default,
    height: 'calc(100% - 56px)',
    marginTop: 56,
    padding: theme.spacing(3),
    width: '100%',
  },
  footer: {
    marginTop: theme.spacing(6),
    textAlign: 'center',
  },
  footerDivider: {
    marginBottom: theme.spacing(2),
    marginLeft: theme.spacing(8),
    marginRight: theme.spacing(8),
  },
  footerText: {
    '& a': {
      color: theme.palette.text.secondary,
    },
    display: 'block',
    fontSize: '0.75rem',
  },
}))

export interface Props {
  children: React.ReactNode
}

const App = ({ children }: Props) => {
  const classes = useStyles()

  return (
    <div className={classes.appFrame}>
      <CssBaseline />

      <LcaHeader />

      <NavPanel />

      <main className={classes.content}>
        <ErrorBoundary>{children}</ErrorBoundary>

        <footer className={classes.footer}>
          <Divider className={classes.footerDivider} />

          <Typography className={classes.footerText}>
            <a
              href={`https://github.com/makzu/lotcastingatemi/blob/master/CHANGELOG.md#${VERSION}`}
            >
              {VERSION}
            </a>
          </Typography>

          <Typography className={classes.footerText}>
            Exalted is &copy; White Wolf AB and Onyx Path.
          </Typography>

          <Typography className={classes.footerText}>
            <Link to="/privacy">Privacy Policy / Legal Notice</Link>
          </Typography>
        </footer>
      </main>

      <LoadingIndicator />
    </div>
  )
}

export default App
