import { useState } from 'react'

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material'

import { createBattlegroup } from '@/ducks/actions'
import { useAppDispatch, useDialogLogic } from '@/hooks'

const CreateBattlegroupDialog = () => {
  const dispatch = useAppDispatch()
  const [bgname, setBgname] = useState('')
  const [isOpen, open, close] = useDialogLogic()

  const handleSubmit = () => {
    dispatch(createBattlegroup({ name: bgname }))
    close()
  }

  return (
    <>
      <Button onClick={open} data-cy="create-battlegroup">
        Create New
      </Button>

      <Dialog open={isOpen} onClose={close}>
        <DialogTitle>Create New Battlegroup</DialogTitle>

        <DialogContent>
          <TextField
            name="name"
            value={bgname}
            label="Name"
            margin="normal"
            fullWidth
            onChange={(e) => setBgname(e.target.value)}
            slotProps={{
              htmlInput: {
                autocomplete: 'off',
                'data-1p-ignore': 'true',
                'data-lp-ignore': 'true',
              },
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

export default CreateBattlegroupDialog
