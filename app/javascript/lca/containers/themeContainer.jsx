import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles'
import green from 'material-ui/colors/green'
import lightgreen from 'material-ui/colors/lightGreen'
import teal from 'material-ui/colors/teal'

import { switchTheme } from '../ducks/actions.js'

/* When changing these colors, it's also important to change the theme_color
 * entries in /config/favicon.json from #2e7d32 to the new value,
 * and to re-run `rails g favicon`
 */
const themes = {
  light: createMuiTheme({
    palette: {
      primary: { main: green[800], },
      secondary: { main: lightgreen[400], },
    },
  }),
  dark: createMuiTheme({
    palette: {
      primary: { main: green[900], },
      secondary: { main: teal[400], },
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
