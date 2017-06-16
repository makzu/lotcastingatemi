import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import IconButton from 'material-ui/IconButton'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import { ResponsiveAppBar, toggleDrawerOpen } from 'material-ui-responsive-drawer'

import { fetchCurrentPlayer, logout } from '../ducks/actions.js'

import LoginForm from './account/login.jsx'

export function LcaHeader(props) {
  const { authenticated, fetchCurrentPlayer, logout, toggleDrawerOpen } = props

  let rightIcon
  if (authenticated) {
    rightIcon = <IconMenu
      iconButtonElement={ <IconButton><MoreVertIcon /></IconButton> }
    >
      <MenuItem primaryText="Refresh" onClick={ fetchCurrentPlayer } />
      <MenuItem primaryText="Sign out" onClick={ logout } />
    </IconMenu>
  } else {
    rightIcon = <LoginForm />
  }

  return(
    <header>
      <ResponsiveAppBar title="Lot-Casting Atemi"
        onLeftIconButtonTouchTap={ toggleDrawerOpen }
        iconElementRight={ rightIcon }
      />
    </header>
  )
}

LcaHeader.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  fetchCurrentPlayer: PropTypes.func,
  logout: PropTypes.func,
  toggleDrawerOpen: PropTypes.func
}

function mapStateToProps(state) {
  const { authenticated } = state.session

  return {
    authenticated
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchCurrentPlayer: () => {
      dispatch(fetchCurrentPlayer())
    }, logout: () => {
      dispatch(logout())
    }, toggleDrawerOpen: () => {
      dispatch(toggleDrawerOpen())
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LcaHeader)
