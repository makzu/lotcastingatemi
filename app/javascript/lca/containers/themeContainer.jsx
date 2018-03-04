import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles'

const themes = {
  light: createMuiTheme({
  }),
  dark: createMuiTheme({
    palette: {
      type: 'dark',
    },
  })
}

function ThemeContainer(props) {
  const { theme, children } = props

  return <MuiThemeProvider theme={ themes[theme] }>
    { children }
  </MuiThemeProvider>
}

ThemeContainer.propTypes = {
  theme: PropTypes.string,
  children: PropTypes.node,
}

function mapStateToProps(state) {
  return {
    theme: state.app.theme,
  }
}

export default connect(mapStateToProps)(ThemeContainer)
