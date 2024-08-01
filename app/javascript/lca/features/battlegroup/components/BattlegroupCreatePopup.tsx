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
import { useCreateBattlegroupMutation } from '../store/battlegroup'

const BattlegroupCreatePopup = () => {
  const [bgname, setBgname] = useState('')
  const [isOpen, open, close] = useDialogLogic()
  const [create] = useCreateBattlegroupMutation()
  const navigate = useNavigate()

  const handleSubmit = () => {
    create({ name: bgname })
      .unwrap()
      .then((fulfilled) => {
        navigate(`/battlegroups/${fulfilled.id}/edit`)
      })
      .catch((rejected) => {
        console.error(rejected)
      })
    close()
  }

  return (
    <>
      <Button data-testid="create-battlegroup" onClick={open}>
        Create New
      </Button>

      <Dialog disableRestoreFocus open={isOpen} onClose={close}>
        <DialogTitle>Create New Battlegroup</DialogTitle>

        <DialogContent>
          <TextField
            fullWidth
            nameField
            autoFocus
            name="name"
            value={bgname}
            label="Name"
            margin="normal"
            debounceDelay={0}
            id="battlegroup-name"
            onChange={(e) => setBgname(e.target.value)}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={close}>Cancel</Button>
          <Button
            variant="contained"
            color="primary"
            data-testid="submit"
            onClick={handleSubmit}
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default BattlegroupCreatePopup
