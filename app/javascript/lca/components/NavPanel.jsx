import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import Divider from 'material-ui/Divider'
import { List, ListItem } from 'material-ui/List'
import { ResponsiveDrawer } from 'material-ui-responsive-drawer'
import styled from 'styled-components'

const NavPanelHeader = styled.div`
  width: 100%;
  height: 2em;
`

export class NavPanel extends React.Component {
  render() {
    return(
      <ResponsiveDrawer>
        <NavPanelHeader> </NavPanelHeader>
        <List>
          <Link to="/">
            <ListItem primaryText="Home" />
          </Link>
          <Divider />
          <Link to="/characters/">
            <ListItem primaryText="My Characters" />
          </Link>
          <ListItem primaryText="Etc" />
        </List>
      </ResponsiveDrawer>
    )
  }
}
NavPanel.propTypes = {
}

function mapStateToProps(state) {
  const { authenticated } = state.session

  return {
    authenticated
  }
}

export default connect(
  mapStateToProps
)(NavPanel)
