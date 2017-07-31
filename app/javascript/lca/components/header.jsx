import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import IconButton from 'material-ui/IconButton'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import { ResponsiveAppBar } from 'material-ui-responsive-drawer'

import { fetchCurrentPlayer, logout } from '../ducks/actions.js'

export function LcaHeader(props) {
  const { authenticated, fetchCurrentPlayer, logout } = props

  let rightIcon
  if (authenticated) {
    rightIcon = <IconMenu
      iconButtonElement={ <IconButton><MoreVertIcon /></IconButton> }
    >
      <MenuItem primaryText="Refresh" onClick={ fetchCurrentPlayer } />
      <MenuItem primaryText="Sign out" onClick={ logout } />
    </IconMenu>
  }

  return(
    <header>
      <ResponsiveAppBar title="Lot-Casting Atemi"
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
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LcaHeader)
