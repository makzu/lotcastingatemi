import * as React from 'react'
import { connect } from 'react-redux'

import {
  Button,
  ButtonProps,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@material-ui/core'

import { State } from 'ducks'
import { useDialogLogic } from 'hooks'
import { isPublicCharacterPage } from 'selectors'

interface StateProps {
  authenticated: boolean
  isLoading: boolean
  isPublic: boolean
}

const CsrfInput = () => {
  // TODO this is duplicated in NavPanel.tsx
  const metaTags = document.getElementsByTagName('meta').namedItem('csrf-token')
  // @ts-expect-error TODO figure out how to convince typescript that this tag will always be here
  const csrfToken = metaTags.content
  return <input type="hidden" name="authenticity_token" value={csrfToken} />
}

const SubmitButton = (props: ButtonProps) => <button {...props} type="submit" />

const LogoutPopup = ({ authenticated, isLoading, isPublic }: StateProps) => {
  const [isOpen, setOpen] = useDialogLogic()
  const [timer, setTimer] = React.useState<NodeJS.Timeout | null>(null)
  React.useEffect(() => {
    if (!(authenticated || isLoading || isPublic)) {
      setTimer(setTimeout(() => setOpen(), 500))
    } else {
      if (timer) clearTimeout(timer)
    }
    return () => {
      if (timer) clearTimeout(timer)
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
          <form action="/auth/developer" method="POST">
            <CsrfInput />
            <Button component={SubmitButton}>Log In (Developer)</Button>
          </form>
        )}
        <form action="/auth/google_oauth2" method="POST">
          <Button variant="contained" color="primary" component={SubmitButton}>
            Log in with Google
          </Button>
        </form>
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
