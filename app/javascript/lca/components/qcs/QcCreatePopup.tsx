import { useState } from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import TextField from '@material-ui/core/TextField'

import { createQc } from '@lca/ducks/actions.ts'
import useAppDispatch from '@lca/hooks/UseAppDispatch.ts'
import useDialogLogic from '@lca/hooks/UseDialogLogic.ts'

const QcCreatePopup = () => {
  const dispatch = useAppDispatch()
  const [isOpen, setOpen, setClosed] = useDialogLogic()
  const [qcName, setQcName] = useState('')

  const handleClose = () => {
    setClosed()
    setQcName('')
  }

  const handleSubmit = () => {
    dispatch(createQc({ name: qcName }))
    handleClose()
  }

  return (
    <>
      <Button onClick={setOpen} data-cy="create-qc">
        Create New
      </Button>

      <Dialog open={isOpen} onClose={handleClose}>
        <DialogTitle>Create New Quick Character</DialogTitle>
        <DialogContent>
          <TextField
            name="name"
            value={qcName}
            label="Name"
            margin="normal"
            fullWidth
            onChange={(e) => setQcName(e.currentTarget.value)}
            inputProps={{
              autocomplete: 'off',
              'data-1p-ignore': 'true',
              'data-lp-ignore': 'true',
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
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

export default QcCreatePopup
