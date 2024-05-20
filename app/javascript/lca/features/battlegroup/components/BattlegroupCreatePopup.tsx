import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material'
import { useState, useRef } from 'react'
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
      <Button onClick={open} data-cy="create-battlegroup">
        Create New
      </Button>

      <Dialog open={isOpen} onClose={close} disableRestoreFocus>
        <DialogTitle>Create New Battlegroup</DialogTitle>

        <DialogContent>
          <TextField
            name="name"
            value={bgname}
            label="Name"
            margin="normal"
            fullWidth
            onChange={(e) => setBgname(e.target.value)}
            nameField
            debounceDelay={0}
            autoFocus
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={close}>Cancel</Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            color="primary"
            data-cy="submit"
            data-testid="submit"
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default BattlegroupCreatePopup
