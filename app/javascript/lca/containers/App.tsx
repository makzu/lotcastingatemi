import { CssBaseline } from '@mui/material'
import { makeStyles } from '@mui/styles'

import LoadingIndicator from 'components/generic/LoadingIndicator.jsx'
import LcaHeader from 'components/header/Header'
import NavPanel from 'components/nav/'
import Footer from 'components/shared/Footer'
import ErrorBoundary from 'containers/ErrorBoundary.jsx'

// Shamelessly stolen from the material-ui drawer demo

const useStyles = makeStyles((theme) => ({
  '@global': {
    '::-webkit-scrollbar': {
      backgroundColor: theme.palette.background.default,
      height: '8px',
      width: '8px',
    },
    '::-webkit-scrollbar-thumb': {
      backgroundColor: theme.palette.divider,
    },
  },
  appFrame: {
    display: 'flex',
    minHeight: '100vh',
    overflowY: 'auto',
    position: 'relative',
    width: '100%',
  },
  content: {
    [theme.breakpoints.up('lg')]: {
      //   height: 'calc(100% - 64px)',
      //   marginLeft: drawerWidth,
      marginLeft: theme.spacing(2),
      //   marginTop: 64,
      //   width: `calc(100% - ${drawerWidth}px)`,
    },
    backgroundColor: theme.palette.background.default,
    height: 'calc(100% - 56px)',
    marginTop: 56,
    padding: theme.spacing(3),
    width: '100%',
  },
}))

interface Props {
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

        <Footer />
      </main>

      <LoadingIndicator />
    </div>
  )
}

export default App
