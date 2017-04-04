import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import AppBar from 'material-ui/AppBar'
import Drawer from 'material-ui/Drawer'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import { List, ListItem } from 'material-ui/List'
import { EmailSignInForm } from 'redux-auth/material-ui-theme'

import { toggleMenu } from '../actions'

class LogInPopup extends React.Component {
  constructor(props) {
    super(props)
    this.handleOpen = this.handleOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)

    this.state = { open: false }
  }

  handleOpen() {
    this.setState({ open: true })
  }

  handleClose() {
    this.setState({ open: false })
  }

  render() {
    const { handleOpen, handleClose } = this
    const actions = [
      <FlatButton
        label="Close"
        primary={ true }
        onTouchTap={ handleClose }
      />
    ]
    return <span>
      <FlatButton label="Log in" onClick={ handleOpen } />
      <Dialog
        title="Log in via Email"
        actions={ actions }
        open={ this.state.open }
        autoScrollBodyContent={ true }
        onRequestClose={ handleClose }
      >
        <EmailSignInForm />
      </Dialog>
    </span>
  }
}

function LcaHeader(props) {
  const { navDrawerOpen, toggleMenu } = props

  return(
      <header>
        <AppBar title="Lot-Casting Atemi"
          onLeftIconButtonTouchTap={ toggleMenu }
        />
        <Drawer open={ navDrawerOpen } docked={ true }>
          <List>
            <ListItem><LogInPopup /></ListItem>
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
  navDrawerOpen: React.PropTypes.bool.isRequired,
  toggleMenu: React.PropTypes.func
}

function mapStateToProps(state) {
  const navDrawerOpen = state.app.navDrawerOpen
  const isSignedIn = state.auth.get('user').get('isSignedIn')

  return {
    isSignedIn,
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
