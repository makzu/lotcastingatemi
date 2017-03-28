import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import AppBar from 'material-ui/AppBar'
import Drawer from 'material-ui/Drawer'
import {List, ListItem} from 'material-ui/List'
import {toggleMenu} from '../actions'

function LcaHeader(props) {
    const { navDrawerOpen, toggleMenu } = props

    return(
      <header>
        <AppBar title="Lot-Casting Atemi"
          onLeftIconButtonTouchTap={ toggleMenu }
        />
        <Drawer open={ navDrawerOpen } docked={ true }>
          <List>
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

function mapStateToProps(state) {
  const navDrawerOpen = state.app.navDrawerOpen

  return {
    navDrawerOpen
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
