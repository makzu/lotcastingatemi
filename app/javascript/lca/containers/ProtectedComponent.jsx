// @flow
import * as React from 'react'
const { Component, Fragment } = React
import { connect } from 'react-redux'

import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Typography from '@material-ui/core/Typography'
import { isPublicCharacterPage } from 'selectors'

type Props = { authenticated: boolean, isPublic: boolean }

class _LogoutPopup extends Component<Props, { open: boolean }> {
  constructor(props) {
    super(props)
    this.state = { open: false }
  }

  static getDerivedStateFromProps(props, state) {
    // eslint-disable-line no-unused-vars
    const { authenticated, isPublic } = props
    if (state.open === !(authenticated || isPublic)) return null
    return { open: !(authenticated || isPublic) }
  }

  render() {
    const { open } = this.state
    return (
      <Dialog open={open}>
        <DialogTitle>You&apos;ve been logged out</DialogTitle>
        <DialogContent>
          <Typography>Sorry about that.</Typography>
        </DialogContent>
        <DialogActions>
          {window.location.hostname === 'localhost' && (
            <Button component="a" href="/auth/developer">
              Log In (Developer)
            </Button>
          )}
          <Button
            variant="contained"
            color="primary"
            component="a"
            href="/auth/google_oauth2"
          >
            Log in with Google
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}
const mapStateToProps = state => ({
  authenticated: state.session.authenticated,
  isPublic: isPublicCharacterPage(state, window.location.pathname),
})
const LogoutPopup = connect(mapStateToProps)(_LogoutPopup)

// TODO: Better Flow typedef here
const ProtectedComponent = (WrappedComponent: Object) => {
  const protectedComponent = (props: Object) => (
    <Fragment>
      <WrappedComponent {...props} />
      <LogoutPopup />
    </Fragment>
  )
  protectedComponent.displayName = 'Protected Component'

  return protectedComponent
}

export default ProtectedComponent
