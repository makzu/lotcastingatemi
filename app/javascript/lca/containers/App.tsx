import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { CssBaseline, Divider, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import LoadingIndicator from '@lca/components/generic/LoadingIndicator.tsx'
import LcaHeader from '@lca/components/header/Header.tsx'
import NavPanel from '@lca/components/nav/index.tsx'
import ErrorBoundary from '@lca/containers/ErrorBoundary.tsx'
import VERSION from '../VERSION.ts'
import { drawerWidth } from './_drawerProperties.ts'

// Shamelessly stolen from the material-ui drawer demo

const scrollbars = (theme) => ({
  '::-webkit-scrollbar': {
    backgroundColor: theme.palette.background.default,
    height: '8px',
    width: '8px',
  },
  '::-webkit-scrollbar-thumb': {
    backgroundColor: theme.palette.divider,
  },
})

const useStyles = makeStyles((theme) => ({
  '@global': theme.disableScrollbars ? {} : scrollbars(theme),
  appFrame: {
    display: 'flex',
    minHeight: '100vh',
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

const App = ({ children }: { children: ReactNode }) => {
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
