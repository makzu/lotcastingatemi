import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material'

import { regenChronicleInviteCode, updateChronicle } from '@/ducks/actions'
import { useAppDispatch, useAppSelector, useDialogLogic } from '@/hooks'
import { getSpecificChronicle } from '@/selectors'

const ChronicleInviteDialog = ({ chronicleId }: { chronicleId: number }) => {
  const dispatch = useAppDispatch()
  const [isOpen, open, close] = useDialogLogic()
  const chronicle = useAppSelector((state) =>
    getSpecificChronicle(state, chronicleId),
  )

  if (chronicle === undefined) return null
  const { name, invite_code } = chronicle

  const handleRegen = () => {
    dispatch(regenChronicleInviteCode(chronicleId))
  }
  const handleDisable = () => {
    dispatch(updateChronicle(chronicleId, { invite_code: '' }))
  }

  return (
    <>
      <Button onClick={open}>Invite Player</Button>

      <Dialog open={isOpen} onClose={close}>
        <DialogTitle>Invite a Player</DialogTitle>

        <DialogContent>
          {invite_code && (
            <>
              <DialogContentText paragraph>
                Another player can join {name} if they have this code.
              </DialogContentText>
              <DialogContentText sx={{ fontSize: '3rem' }}>
                {invite_code}
              </DialogContentText>
            </>
          )}
          {!invite_code && (
            <DialogContentText>
              This Chronicle is currently closed to new players. Click Make New
              Code to re-open.
            </DialogContentText>
          )}
        </DialogContent>

        <DialogActions>
          <Button onClick={close}>Close</Button>
          <Button onClick={handleDisable}>Disable invitations</Button>
          <Button onClick={handleRegen}>Make new Code</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default ChronicleInviteDialog
