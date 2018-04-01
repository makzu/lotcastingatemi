import React from 'react'
//import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Button from 'material-ui/Button'
import Dialog, { DialogActions, DialogContent, DialogTitle } from 'material-ui/Dialog'
import Typography from 'material-ui/Typography'

class _LogoutPopup extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  static getDerivedStateFromProps(props, state) { // eslint-disable-line no-unused-vars
    return({ open: !props.authenticated })
  }

  render() {
    const { open } = this.state
    return <Dialog
      open={ open }
    >
      <DialogTitle>You&apos;ve been logged out</DialogTitle>
      <DialogContent>
        <Typography>Sorry about that.</Typography>
      </DialogContent>
      <DialogActions>
        { window.location.hostname === 'localhost' &&
          <Button component="a" href="/auth/developer">
            Log In (Developer)
          </Button>
        }
        <Button variant="raised" color="primary" component="a" href="/auth/google_oauth2">
          Log in with Google
        </Button>
      </DialogActions>

    </Dialog>
  }
}
const mapStateToProps = (state) => ({
  authenticated: state.session.authenticated
})
const LogoutPopup = connect(mapStateToProps)(_LogoutPopup)

const ProtectedComponent = WrappedComponent => {
  const protectedComponent = props => <React.Fragment>
    <WrappedComponent { ...props } />
    <LogoutPopup />
  </React.Fragment>
  protectedComponent.displayName = 'Protected Component'

  return protectedComponent
}

export default ProtectedComponent
