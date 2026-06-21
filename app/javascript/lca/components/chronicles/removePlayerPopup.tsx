import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

import { removePlayerFromChronicle as removePlayer } from '@lca/ducks/actions/index.ts'
import useAppDispatch from '@lca/hooks/UseAppDispatch.ts'
import useAppSelector from '@lca/hooks/UseAppSelector.ts'
import useDialogLogic from '@lca/hooks/UseDialogLogic.ts'
import {
  getSpecificChronicle,
  getSpecificPlayer,
} from '@lca/selectors/index.ts'

interface Props {
  chronicleId: number
  playerId: number
}

const RemovePlayerPopup = ({ chronicleId, playerId }: Props) => {
  const dispatch = useAppDispatch()
  const chronicle = useAppSelector((state) =>
    getSpecificChronicle(state, chronicleId),
  )
  const player = useAppSelector((state) => getSpecificPlayer(state, playerId))
  const [isOpen, setOpen, setClosed] = useDialogLogic()

  const handleSubmit = () => {
    dispatch(removePlayer(chronicleId, playerId))
    setClosed()
  }

  return (
    <>
      <Button onClick={setOpen}>Kick</Button>

      <Dialog open={isOpen} onClose={setClosed}>
        <DialogTitle>Remove {player.display_name}?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            This will remove {player.display_name} and all of their characters
            from {chronicle.name}.
          </DialogContentText>
          {!!chronicle.invite_code && (
            <DialogContentText>
              If they still have {chronicle.name}'s invite code, they will be
              able to re-join unless you generate a new invite code or disable
              invitations.
            </DialogContentText>
          )}
        </DialogContent>

        <DialogActions>
          <Button onClick={setClosed}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Remove
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default RemovePlayerPopup
