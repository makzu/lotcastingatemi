import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

import { removePlayerFromChronicle as removePlayer } from '@lca/ducks/actions.ts'
import { useAppSelector, useDialogLogic } from '@lca/hooks/index.ts'
import { getSpecificChronicle } from '@lca/selectors/index.ts'

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
