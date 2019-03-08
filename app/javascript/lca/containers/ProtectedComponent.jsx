// @flow
import * as React from 'react'
import { connect } from 'react-redux'

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@material-ui/core'
import { isPublicCharacterPage } from 'selectors'

type Props = { authenticated: boolean, isPublic: boolean }

class LogoutPopup extends React.Component<Props, { open: boolean }> {
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
const ConnectedLogoutPopup = connect(mapStateToProps)(LogoutPopup)

// TODO: Better Flow typedef here
const ProtectedComponent = (WrappedComponent: Object) => {
  const protectedComponent = (props: Object) => (
    <>
      <WrappedComponent {...props} />
      <ConnectedLogoutPopup />
    </>
  )
  protectedComponent.displayName = 'Protected Component'

  return protectedComponent
}

export default ProtectedComponent
