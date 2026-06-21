import { useEffect, useState } from 'react'
import {
  Button,
  type ButtonProps,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@material-ui/core'

import { useAppSelector, useDialogLogic } from '@lca/hooks/index.ts'
import { isPublicCharacterPage } from '@lca/selectors/index.ts'

const CsrfInput = () => {
  const csrfToken = document.getElementsByTagName('meta')['csrf-token'].content
  return <input type="hidden" name="authenticity_token" value={csrfToken} />
}

const SubmitButton = (props: ButtonProps) => <button {...props} type="submit" />

const LogoutPopup = () => {
  const authenticated = useAppSelector((state) => state.session.authenticated)
  const isLoading = useAppSelector((state) => state.app.loading)
  const isPublic = useAppSelector((state) =>
    isPublicCharacterPage(state, window.location.pathname),
  )
  const [isOpen, setOpen] = useDialogLogic()
  const [timer, setTimer] = useState(null)
  useEffect(() => {
    if (!(authenticated || isLoading || isPublic)) {
      setTimer(setTimeout(() => setOpen(), 500))
    } else {
      clearTimeout(timer)
    }
    return () => {
      clearTimeout(timer)
    }
  }, [authenticated, isLoading, isPublic, setOpen, timer])

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

export default LogoutPopup
