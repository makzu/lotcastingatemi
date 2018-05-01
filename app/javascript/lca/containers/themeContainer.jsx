// @flow
import * as React from 'react'
import { connect } from 'react-redux'

import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles'
import green from 'material-ui/colors/green'
import lightgreen from 'material-ui/colors/lightGreen'
import teal from 'material-ui/colors/teal'

import { switchTheme } from 'ducks/actions.js'

/* When changing these colors, it's also important to change the theme_color
 * entries in /config/favicon.json from #2e7d32 to the new value,
 * and to re-run `rails g favicon`
 */
const themeCommon = {
  overrides: {
    MuiSelect: {
      selectMenu: {
        //overflow: 'inherit',
      },
    },
  },
}
const themes = {
  light: createMuiTheme({
    palette: {
      primary: { main: green[800] },
      secondary: { main: lightgreen[400] },
    },
    ...themeCommon,
  }),
  dark: createMuiTheme({
    palette: {
      primary: { main: green[900] },
      secondary: { main: teal[400] },
      type: 'dark',
    },
    ...themeCommon,
  }),
}
type Props = { theme: string, children: React.Node, switchTheme: Function }
class ThemeContainer extends React.Component<Props> {
  componentDidMount() {
    window.addEventListener('storage', this.handleStorageChange)
  }
  componentWillUnmount() {
    window.removeEventListener('storage', this.handleStorageChange)
  }

  handleStorageChange = e => {
    if (e.key != 'theme') return

    this.props.switchTheme(e.newValue)
  }

  render() {
    const { theme, children } = this.props

    return <MuiThemeProvider theme={themes[theme]}>{children}</MuiThemeProvider>
  }
}
const mapStateToProps = state => ({ theme: state.app.theme })
export default connect(mapStateToProps, { switchTheme })(ThemeContainer)
