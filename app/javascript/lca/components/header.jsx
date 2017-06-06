import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import AppBar from 'material-ui/AppBar'
import Drawer from 'material-ui/Drawer'
import { List, ListItem } from 'material-ui/List'

import LoginForm from './account/login.jsx'
import { toggleMenu } from '../ducks/actions.js'

export function LcaHeader(props) {
  const { navDrawerOpen, toggleMenu } = props

  return(
      <header>
        <AppBar title="Lot-Casting Atemi"
          onLeftIconButtonTouchTap={ toggleMenu }
        />
        <Drawer open={ navDrawerOpen } docked={ true }>
          <List>
            <ListItem><LoginForm /></ListItem>
            <Link to="/">
              <ListItem primaryText="Home" onClick={ toggleMenu } />
            </Link>
            <Link to="/characters/">
              <ListItem primaryText="My Characters" onClick={ toggleMenu } />
            </Link>
            <ListItem primaryText="Etc" onClick={ toggleMenu } />
          </List>
        </Drawer>
      </header>
  )
}

LcaHeader.propTypes = {
  navDrawerOpen: PropTypes.bool.isRequired,
  authenticated: PropTypes.bool.isRequired,
  toggleMenu: PropTypes.func
}

function mapStateToProps(state) {
  const { navDrawerOpen } = state.app
  const { authenticated } = state.session

  return {
    navDrawerOpen, authenticated
  }
}

function mapDispatchToProps(dispatch) {
  return {
    toggleMenu: () => {
      dispatch(toggleMenu())
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LcaHeader)
