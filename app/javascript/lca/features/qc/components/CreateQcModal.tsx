import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import TextField from '@/components/fields/TextField'
import { useDialogLogic } from '@/hooks'
import { useCreateQcMutation } from '../store/qc'

const CreateQcModal = () => {
  const [isOpen, open, close] = useDialogLogic()
  const [qcName, setQcName] = useState('')
  const [create] = useCreateQcMutation()
  const navigate = useNavigate()

  const handleSubmit = () => {
    create({ name: qcName })
      .unwrap()
      .then((fulfilled) => {
        navigate(`/qcs/${fulfilled.id}/edit`)
      })
      .catch((rejected) => {
        console.error(rejected)
      })
    close()
  }

  return (
    <>
      <Button data-cy="create-qc" onClick={open}>
        Create New
      </Button>

      <Dialog disableRestoreFocus open={isOpen} onClose={close}>
        <DialogTitle>Create New Quick Character</DialogTitle>

        <DialogContent>
          <TextField
            autoFocus
            nameField
            fullWidth
            name="name"
            value={qcName}
            label="Name"
            margin="normal"
            debounceDelay={0}
            id="qc-name"
            onChange={(e) => setQcName(e.target.value)}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={close}>Cancel</Button>
          <Button
            variant="contained"
            color="primary"
            data-cy="submit"
            onClick={handleSubmit}
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default CreateQcModal
