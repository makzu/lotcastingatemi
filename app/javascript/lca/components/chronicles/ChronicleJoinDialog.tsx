import { useState } from 'react'

import { GroupAdd } from '@mui/icons-material'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  TextField,
} from '@mui/material'

import { joinChronicle } from '@/ducks/actions'

import { useAppDispatch, useDialogLogic } from '@/hooks'

export const ChronicleJoinDialog = () => {
  const dispatch = useAppDispatch()
  const [isOpen, open, close] = useDialogLogic()
  const [code, setCode] = useState('')

  const handleSubmit = () => {
    dispatch(joinChronicle(code))
    close()
  }

  return (
    <>
      <ListItemButton onClick={open}>
        <ListItemIcon>
          <GroupAdd />
        </ListItemIcon>

        <ListItemText primary="Join" />
      </ListItemButton>

      <Dialog open={isOpen} onClose={close}>
        <DialogTitle>Join a Chronicle</DialogTitle>
        <DialogContent>
          <TextField
            variant="standard"
            name="code"
            value={code}
            label="Invite Code"
            margin="normal"
            fullWidth
            onChange={(e) => setCode(e.target.value)}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={close}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Join
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default ChronicleJoinDialog
