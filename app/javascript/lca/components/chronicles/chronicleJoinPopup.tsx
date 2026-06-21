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
import GroupAdd from '@material-ui/icons/GroupAdd'

import { joinChronicle } from '@lca/ducks/actions/index.ts'
import { useAppDispatch, useDialogLogic } from '@lca/hooks/index.ts'

export const ChronicleJoinPopup = () => {
  const dispatch = useAppDispatch()
  const [isOpen, open, close] = useDialogLogic()
  const [code, setCode] = useState('')

  const handleSubmit = () => {
    dispatch(joinChronicle(code))
    close()
  }

  return (
    <>
      <ListItem button onClick={open}>
        <ListItemIcon>
          <GroupAdd />
        </ListItemIcon>

        <ListItemText primary="Join" />
      </ListItem>

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

export default ChronicleJoinPopup
