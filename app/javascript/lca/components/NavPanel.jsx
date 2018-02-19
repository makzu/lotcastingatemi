import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter, NavLink } from 'react-router-dom'

import Divider from 'material-ui/Divider'
import List, { ListItem, ListItemText } from 'material-ui/List'
import styled from 'styled-components'

import { fullChar, fullQc } from '../utils/propTypes'

const NavPanelHeader = styled.div`
  width: 100%;
  height: 55px;
`

export class NavPanel extends React.Component {
  render() {
    const { authenticated } = this.props

    return(
      <div>
        <NavPanelHeader> </NavPanelHeader>
        <List component="nav">
          <ListItem button component={ NavLink } to="/lca">
            <ListItemText primary="Home" />
          </ListItem>

          { !authenticated &&
            <ListItem button component="a" href="/auth/google_oauth2">
              <ListItemText primary="Log in with Google"
              />
            </ListItem>
          }

          { authenticated &&
            <ListItem button component={ NavLink } to="/">
              <ListItemText primary="Characters" />
            </ListItem>
          }

          <Divider />
          <ListItem>
            <ListItemText primary="Resources" />
          </ListItem>

          <Divider />
          <ListItem button component="a"
            href="https://github.com/makzu/lotcastingatemi"
            target="_blank" rel="noopener noreferrer"
          >
            <ListItemText primary="View on GitHub" />
          </ListItem>

        </List>
      </div>
    )
  }
}
NavPanel.propTypes = {
  authenticated: PropTypes.bool,
  history: PropTypes.object,
}

function mapStateToProps(state) {
  const { authenticated } = state.session

  return {
    authenticated
  }
}

export default withRouter(connect(
  mapStateToProps
)(NavPanel))
