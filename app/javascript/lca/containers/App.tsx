import { useEffect } from 'react'

import { Box, CssBaseline } from '@mui/material'

import LoadingIndicator from '@/components/generic/LoadingIndicator'
import LcaHeader from '@/components/header/Header'
import NavPanel from '@/components/nav/'
import Footer from '@/components/shared/Footer'
import ErrorBoundary from '@/containers/ErrorBoundary'

// Shamelessly stolen from the material-ui drawer demo

interface Props {
  children: React.ReactNode
}

const App = ({ children }: Props) => {
  useEffect(() => {
    // Profiler
    // eslint-disable-next-line no-constant-condition
    if (true) return

    const script = document.createElement('script')
    script.async = true
    script.src =
      '/mini-profiler-resources/includes.js?v=12b4b45a3c42e6e15503d7a03810ff33'
    script.type = 'text/javascript'
    script.id = 'mini-profiler'
    script.setAttribute(
      'data-css-url',
      '/mini-profiler-resources/includes.css?v=12b4b45a3c42e6e15503d7a03810ff33',
    )
    script.setAttribute('data-version', '12b4b45a3c42e6e15503d7a03810ff33')
    script.setAttribute('data-path', '/mini-profiler-resources/')
    script.setAttribute('data-horizontal-position', 'left')
    script.setAttribute('data-vertical-position', 'top')
    script.setAttribute('data-ids', '')
    script.setAttribute('data-trivial', 'false')
    script.setAttribute('data-children', 'false')
    script.setAttribute('data-max-traces', '20')
    script.setAttribute('data-controls', 'false')
    script.setAttribute('data-total-sql-count', 'false')
    script.setAttribute('data-authorized', 'true')
    script.setAttribute('data-toggle-shortcut', 'Alt+P')
    script.setAttribute('data-start-hidden', 'false')
    script.setAttribute('data-collapse-results', 'true')
    script.setAttribute('data-hidden-custom-fields', '')
    script.setAttribute('data-html-container', 'body')
    document.head.appendChild(script)
  })

  return (
    <Box
      sx={{
        display: 'flex',
        minHeight: '100vh',
        overflowY: 'auto',
        position: 'relative',
        width: '100%',
      }}
    >
      <CssBaseline />

      <LcaHeader />

      <NavPanel />

      <Box
        component="main"
        sx={{
          marginLeft: { lg: 2 },
          // [theme.breakpoints.up('lg')]: {
          //   //   height: 'calc(100% - 64px)',
          //   //   marginLeft: drawerWidth,
          //   marginLeft: theme.spacing(2),
          //   //   marginTop: 64,
          //   //   width: `calc(100% - ${drawerWidth}px)`,
          // },
          backgroundColor: 'background.default',
          height: 'calc(100% - 56px)',
          marginTop: { xs: '64px ', lg: '76px' },
          padding: 3,
          width: '100%',
        }}
      >
        <ErrorBoundary>{children}</ErrorBoundary>

        <Footer />
      </Box>

      <LoadingIndicator />
    </Box>
  )
}

export default App
