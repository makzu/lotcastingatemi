import { useState } from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import TextField from '@material-ui/core/TextField'
import AddCircle from '@material-ui/icons/AddCircle'

import { createChronicle } from '@lca/ducks/actions/index.ts'
import { useAppDispatch, useDialogLogic } from '@lca/hooks/index.ts'

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
      <ListItem button onClick={open}>
        <ListItemIcon>
          <AddCircle />
        </ListItemIcon>

        <ListItemText primary="Create New" />
      </ListItem>

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
