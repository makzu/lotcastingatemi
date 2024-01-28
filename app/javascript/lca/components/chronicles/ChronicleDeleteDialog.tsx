import { Delete } from '@mui/icons-material'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material'

import { destroyChronicle } from '@/ducks/actions'
import { useAppDispatch, useAppSelector, useDialogLogic } from '@/hooks'
import { getSpecificChronicle } from '@/selectors'

interface Props {
  chronicleId: number
}

export const ChronicleDeleteDialog = ({ chronicleId }: Props) => {
  const dispatch = useAppDispatch()
  const [isOpen, open, close] = useDialogLogic()
  const chronicle = useAppSelector((state) =>
    getSpecificChronicle(state, chronicleId),
  )
  if (chronicle === undefined) return null

  const { name } = chronicle
  const handleSubmit = () => {
    dispatch(destroyChronicle(chronicleId))
    close()
  }

  return (
    <>
      <Button onClick={open}>
        Delete Chronicle &nbsp;
        <Delete />
      </Button>

      <Dialog open={isOpen} onClose={close}>
        <DialogTitle>Delete {name}?</DialogTitle>
        <DialogContent>
          <DialogContentText>This cannot be undone!</DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={close}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
