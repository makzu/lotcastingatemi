import React from 'react'
import PropTypes from 'prop-types'

import Paper from 'material-ui/Paper'

import LcaHeader from '../components/header.jsx'

export default class App extends React.Component {
  render() {
    const { children } = this.props

    return(<div>
      <LcaHeader />
      <Paper className="contentWrapper">
        { children }
      </Paper>
    </div>)
  }
}
App.propTypes = {
  children: PropTypes.function
}
