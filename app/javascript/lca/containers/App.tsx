import { Box, CssBaseline } from '@mui/material'
import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'

import LoadingIndicator from '@/components/generic/LoadingIndicator'
import LcaHeader from '@/components/header/Header'
import NavPanel from '@/components/nav/'
import Footer from '@/components/shared/Footer'
import ErrorBoundary from '@/containers/ErrorBoundary'
import { drawerWidth } from './_drawerProperties'

// Shamelessly stolen from the material-ui drawer demo

const App = () => {
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
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      <LcaHeader />

      <NavPanel />

      <Box
        component="main"
        sx={{
          marginLeft: { lg: 2 },
          lg: {
            marginLeft: drawerWidth,
            width: `calc(100% - ${drawerWidth}px)`,
          },
          marginTop: '64px ',
          padding: 3,
          width: '100%',
        }}
      >
        <ErrorBoundary>
          <Outlet />
        </ErrorBoundary>

        <Footer />
      </Box>

      <LoadingIndicator />
    </Box>
  )
}

export default App
