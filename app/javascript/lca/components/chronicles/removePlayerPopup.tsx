import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material'

import { removePlayerFromChronicle as removePlayer } from '@/ducks/actions'
import { useAppDispatch, useAppSelector, useDialogLogic } from '@/hooks'
import { getSpecificChronicle, getSpecificPlayer } from '@/selectors'

interface Props {
  chronicleId: number
  playerId: number
}

const RemovePlayerDialog = ({ chronicleId, playerId }: Props) => {
  const dispatch = useAppDispatch()
  const [isOpen, open, close] = useDialogLogic()

  const chronicle = useAppSelector((state) =>
    getSpecificChronicle(state, chronicleId),
  )
  const player = useAppSelector((state) => getSpecificPlayer(state, playerId))

  if (chronicle === undefined || player === undefined) return null

  const handleSubmit = () => {
    dispatch(removePlayer(chronicleId, playerId))
    close()
  }

  return (
    <>
      <Button onClick={open}>Kick</Button>

      <Dialog open={isOpen} onClose={close}>
        <DialogTitle>Remove {player.display_name}?</DialogTitle>

        <DialogContent>
          <DialogContentText>
            This will remove {player.display_name} and all of their characters
            from {chronicle.name}.
          </DialogContentText>
          <DialogContentText>
            They will be able to re-join unless you generate a new invite code
            or disable invitations.
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={close}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Remove
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default RemovePlayerDialog
