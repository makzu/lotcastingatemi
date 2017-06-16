import React from 'react'
import PropTypes from 'prop-types'

import Paper from 'material-ui/Paper'
import { BodyContainer } from 'material-ui-responsive-drawer'

import LcaHeader from '../components/header.jsx'
import NavPanel from '../components/NavPanel.jsx'

export default class App extends React.Component {
  render() {
    const { children } = this.props

    return(<div>
      <NavPanel />
      <BodyContainer>
        <LcaHeader />
        <Paper className="contentWrapper">
          { children }
        </Paper>
      </BodyContainer>
    </div>)
  }
}
App.propTypes = {
  children: PropTypes.object.isRequired
}
