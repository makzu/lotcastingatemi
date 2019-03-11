import * as React from 'react'
import { connect } from 'react-redux'

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography
} from '@material-ui/core'

import { State } from 'ducks'
import { useDialogLogic } from 'hooks'
import { isPublicCharacterPage } from 'selectors'

interface StateProps {
  authenticated: boolean
  isLoading: boolean
  isPublic: boolean
}

const LogoutPopup = ({ authenticated, isLoading, isPublic }: StateProps) => {
  const [isOpen, setOpen] = useDialogLogic()
  const [timer, setTimer] = React.useState(null)
  React.useEffect(() => {
    if (!(authenticated || isLoading || isPublic)) {
      setTimer(setTimeout(() => setOpen(), 500))
    } else {
      clearTimeout(timer)
    }
    return () => {
      clearTimeout(timer)
    }
  }, [authenticated, isLoading, isPublic])

  return (
    <Dialog open={isOpen}>
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

const mapState = (state: State): StateProps => ({
  authenticated: state.session.authenticated,
  isLoading: state.app.loading,
  isPublic: isPublicCharacterPage(state, window.location.pathname),
})

export default connect(mapState)(LogoutPopup)
