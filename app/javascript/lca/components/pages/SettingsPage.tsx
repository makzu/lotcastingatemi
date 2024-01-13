import { PaletteMode } from '@mui/material'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import MuiTextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

import TextField from 'components/generic/TextField'
import BlockPaper from 'components/shared/BlockPaper'

import { destroyAccount, updatePlayer } from 'ducks/actions'
import { getCurrentPlayer } from 'ducks/entities'
import { switchTheme } from 'features/themeSlice'
import { useAppDispatch, useAppSelector, useDialogLogic } from 'hooks'

const ThemeSelect = () => {
  const currentTheme = useAppSelector((state) => state.theme)
  const dispatch = useAppDispatch()
  const action = (theme: Parameters<typeof switchTheme>[0]) =>
    dispatch(switchTheme(theme))
  return (
    <MuiTextField
      variant="standard"
      select
      label="Theme"
      value={currentTheme}
      onChange={(e) => action(e.target.value as PaletteMode)}
      margin="dense"
    >
      <MenuItem value="light">Light</MenuItem>
      <MenuItem value="dark">Dark</MenuItem>
    </MuiTextField>
  )
}

const SettingsPage = () => {
  const [isOpen, setOpen, setClosed] = useDialogLogic()
  const player = useAppSelector((state) => getCurrentPlayer(state))
  const dispatch = useAppDispatch()

  const handleClickDelete = () => {
    dispatch(destroyAccount())
    setClosed()
  }

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updatePlayer(player.id, { display_name: e.target.value }))
  }

  return (
    <BlockPaper>
      <Typography variant="h5" gutterBottom>
        Settings
      </Typography>

      <TextField
        label="Display Name"
        name="display_name"
        value={player.display_name}
        onChange={handleChangeName}
        margin="dense"
      />
      <Typography paragraph>
        Displayed to other players in your chronicles.
      </Typography>

      <Divider style={{ margin: '1em 0' }} />

      <ThemeSelect />

      <Divider style={{ margin: '1em 0' }} />

      <Button onClick={setOpen}>Delete Account</Button>

      <Dialog open={isOpen} onClose={setClosed}>
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
          <Button onClick={setClosed}>Cancel</Button>
          <Button onClick={handleClickDelete}>Delete Account</Button>
        </DialogActions>
      </Dialog>
    </BlockPaper>
  )
}

export default SettingsPage
