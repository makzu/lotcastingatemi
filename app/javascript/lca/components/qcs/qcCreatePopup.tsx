import { useState } from 'react'

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material'

import { createQc } from '@/ducks/actions'
import { useAppDispatch, useDialogLogic } from '@/hooks'

const CreateQcDialog = () => {
  const dispatch = useAppDispatch()
  const [isOpen, open, close] = useDialogLogic()
  const [qcName, setQcName] = useState('')

  const handleSubmit = () => {
    dispatch(createQc({ name: qcName }))
    close()
  }

  return (
    <>
      <Button onClick={open} data-cy="create-qc">
        Create New
      </Button>

      <Dialog open={isOpen} onClose={close}>
        <DialogTitle>Create New Quick Character</DialogTitle>

        <DialogContent>
          <TextField
            variant="standard"
            name="name"
            value={qcName}
            label="Name"
            margin="normal"
            fullWidth
            onChange={(e) => setQcName(e.target.value)}
            inputProps={{
              autocomplete: 'off',
              'data-1p-ignore': 'true',
              'data-lp-ignore': 'true',
            }}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={close}>Cancel</Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            color="primary"
            data-cy="submit"
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default CreateQcDialog
