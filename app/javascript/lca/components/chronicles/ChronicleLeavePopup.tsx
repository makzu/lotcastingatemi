import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material'

import { removePlayerFromChronicle as removePlayer } from '@/ducks/actions'
import { useAppSelector, useDialogLogic } from '@/hooks'
import { getSpecificChronicle } from '@/selectors'

const ChronicleLeaveDialog = ({ chronicleId }: { chronicleId: number }) => {
  const [isOpen, open, close] = useDialogLogic()
  const chronicle = useAppSelector((state) =>
    getSpecificChronicle(state, chronicleId),
  )
  const playerId = useAppSelector((state) => state.session.id)

  if (chronicle === undefined) return null

  const handleSubmit = () => {
    removePlayer(chronicleId, playerId)
    close()
  }

  return (
    <>
      <Button onClick={open}>Leave Chronicle</Button>

      <Dialog open={isOpen} onClose={close}>
        <DialogTitle>Leave {chronicle.name}?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            This will remove you and all of your characters from{' '}
            {chronicle.name}.
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={close}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Leave
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default ChronicleLeaveDialog
