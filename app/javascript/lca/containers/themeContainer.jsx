import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles'

import { switchTheme } from '../ducks/actions.js'

const themes = {
  light: createMuiTheme({
  }),
  dark: createMuiTheme({
    palette: {
      type: 'dark',
    },
  })
}

class ThemeContainer extends React.Component {
  constructor(props) {
    super(props)
    this.handleStorageChange = this.handleStorageChange.bind(this)
  }
  componentDidMount() {
    window.addEventListener('storage', this.handleStorageChange)
  }
  componentWillUnmount() {
    window.removeEventListener('storage', this.handleStorageChange)
  }

  handleStorageChange(e) {
    if (e.key != 'theme')
      return

    this.props.switchTheme(e.newValue)
  }

  render() {
    const { theme, children } = this.props

    return <MuiThemeProvider theme={ themes[theme] }>
      { children }
    </MuiThemeProvider>
  }
}

ThemeContainer.propTypes = {
  theme: PropTypes.string,
  children: PropTypes.node,
  switchTheme: PropTypes.func,
}

function mapStateToProps(state) {
  return {
    theme: state.app.theme,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    switchTheme: (theme) => dispatch(switchTheme(theme))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ThemeContainer)
