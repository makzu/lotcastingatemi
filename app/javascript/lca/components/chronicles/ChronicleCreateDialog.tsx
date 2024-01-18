import { useState } from 'react'

import { AddCircle } from '@mui/icons-material'
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

import { createChronicle } from '@/ducks/entities/chronicle'
import { useAppDispatch, useDialogLogic } from '@/hooks'

const ChronicleCreateDialog = () => {
  const [isOpen, open, close] = useDialogLogic()
  const [name, setName] = useState('')
  const dispatch = useAppDispatch()

  const handleSubmit = () => {
    close()
    dispatch(createChronicle({ name }))
  }

  return (
    <>
      <ListItemButton onClick={open}>
        <ListItemIcon>
          <AddCircle />
        </ListItemIcon>

        <ListItemText primary="Create New" />
      </ListItemButton>

      <Dialog open={isOpen} onClose={close}>
        <DialogTitle>Be the Storyteller of a new Chronicle</DialogTitle>
        <DialogContent>
          <TextField
            variant="standard"
            name="name"
            value={name}
            label="Name"
            margin="normal"
            fullWidth
            onChange={(e) => setName(e.target.value)}
            inputProps={{
              autocomplete: 'off',
              'data-1p-ignore': 'true',
              'data-lp-ignore': 'true',
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={close}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default ChronicleCreateDialog
