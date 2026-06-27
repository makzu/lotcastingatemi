import { useState } from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import TextField from '@material-ui/core/TextField'

import { createBattlegroup } from '@lca/ducks/actions.ts'
import useAppDispatch from '@lca/hooks/UseAppDispatch.ts'
import useDialogLogic from '@lca/hooks/UseDialogLogic.ts'

const BattlegroupCreatePopup = () => {
  const [isOpen, setOpen, setClosed] = useDialogLogic()
  const [bgName, setBgName] = useState('')
  const dispatch = useAppDispatch()

  const handleSubmit = () => {
    setClosed()
    dispatch(createBattlegroup({ name: bgName }))
    setBgName('')
  }

  return (
    <>
      <Button onClick={setOpen} data-cy="create-battlegroup">
        Create New
      </Button>
      <Dialog open={isOpen} onClose={setClosed}>
        <DialogTitle>Create New Battlegroup</DialogTitle>
        <DialogContent>
          <TextField
            name="name"
            value={bgName}
            label="Name"
            margin="normal"
            fullWidth
            onChange={(e) => setBgName(e.target.value)}
            inputProps={{
              autocomplete: 'off',
              'data-1p-ignore': 'true',
              'data-lp-ignore': 'true',
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={setClosed}>Cancel</Button>
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

export default BattlegroupCreatePopup
