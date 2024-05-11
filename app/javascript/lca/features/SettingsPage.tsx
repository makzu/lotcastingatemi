import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  MenuItem,
  TextField as MuiTextField,
  Typography,
  type PaletteMode,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'

import TextField from '@/components/generic/TextField'
import BlockPaper from '@/components/shared/BlockPaper'
import { useAppDispatch, useAppSelector, useDialogLogic } from '@/hooks'
import {
  useDestroyPlayerMutation,
  useGetCurrentPlayerQuery,
  useUpdatePlayerMutation,
} from './player/store'
import { switchTheme } from './themeSlice'
import { emptySplitApi } from './api'

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
  const { isError, isLoading, data: player } = useGetCurrentPlayerQuery()
  const [updatePlayer] = useUpdatePlayerMutation()
  const [deletePlayer] = useDestroyPlayerMutation()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!player) return
    const { name, value } = e.target
    updatePlayer({ id: player.id, [name]: value })
  }

  const handleClickDelete = () => {
    if (!player) return
    deletePlayer(player.id)
    dispatch(emptySplitApi.util.resetApiState())
    navigate('/')
  }

  if (isLoading || !player) {
    return <BlockPaper>Loading...</BlockPaper>
  }

  if (isError) {
    return <BlockPaper>Error loading player data.</BlockPaper>
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
        onChange={handleUpdate}
        margin="dense"
      />
      <Typography paragraph>
        Displayed to other players in your chronicles.
      </Typography>

      <Divider sx={{ margin: '1em 0' }} />

      <ThemeSelect />

      <Divider sx={{ margin: '1em 0' }} />

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
