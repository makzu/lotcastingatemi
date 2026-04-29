import type React from 'react'

import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Divider from '@material-ui/core/Divider'
import MenuItem from '@material-ui/core/MenuItem'
import MuiTextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'

import { destroyAccount, updatePlayer } from '@lca/ducks/actions'
import { type PaletteMode, switchTheme } from '@lca/features/themeSlice'
import { useDialogLogic } from '@lca/hooks'
import { useAppDispatch } from '@lca/hooks/UseAppDispatch'
import { useAppSelector } from '@lca/hooks/UseAppSelector'
import BlockPaper from 'components/generic/blockPaper.jsx'
import TextField from 'components/generic/TextField.jsx'
import ProtectedComponent from 'containers/ProtectedComponent'
import { getSpecificPlayer } from 'selectors'

const SettingsPage = () => {
  const dispatch = useAppDispatch()
  const [dialogOpen, setDialogOpen, setDialogClosed] = useDialogLogic()
  const theme = useAppSelector((state) => state.theme)
  const id = useAppSelector((state) => state.session.id)
  const player = useAppSelector((state) => getSpecificPlayer(state, id))

  const deleteAccount = () => {
    dispatch(destroyAccount())
    setDialogClosed()
  }

  /* Escape hatch */
  if (player === undefined)
    return <Typography paragraph>Not yet loaded</Typography>

  return (
    <BlockPaper>
      <Typography variant="h5" gutterBottom>
        Settings
      </Typography>

      <TextField
        label="Display Name"
        name="display_name"
        value={player.display_name}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          dispatch(updatePlayer(player.id, { display_name: e.target.value }))
        }
        margin="dense"
      />
      <Typography paragraph>
        Displayed to other players in your chronicles.
      </Typography>

      <Divider style={{ margin: '1em 0' }} />

      <MuiTextField
        select
        label="Theme"
        value={theme}
        onChange={(e) => dispatch(switchTheme(e.target.value as PaletteMode))}
        margin="dense"
      >
        <MenuItem value="light">Light</MenuItem>
        <MenuItem value="dark">Dark</MenuItem>
      </MuiTextField>

      <Divider style={{ margin: '1em 0' }} />

      <Button onClick={setDialogOpen}>Delete Account</Button>

      <Dialog open={dialogOpen} onClose={setDialogClosed}>
        <DialogTitle>Delete your account?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            This will delete your account, as well as all of your chronicles,
            characters, QCs, and battlegroups. This includes any characters or
            QCs you may have marked as public.
          </DialogContentText>
          <DialogContentText>
            <strong>This cannot be undone!</strong>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={setDialogClosed}>Cancel</Button>
          <Button onClick={deleteAccount}>Delete Account</Button>
        </DialogActions>
      </Dialog>
    </BlockPaper>
  )
}

export default ProtectedComponent(SettingsPage)
