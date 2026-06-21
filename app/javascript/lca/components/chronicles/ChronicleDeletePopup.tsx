import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Delete from '@material-ui/icons/Delete'

import { destroyChronicle } from '@lca/ducks/actions/index.ts'
import {
  useAppDispatch,
  useAppSelector,
  useDialogLogic,
} from '@lca/hooks/index.ts'
import { getSpecificChronicle } from '@lca/selectors/index.ts'

interface Props {
  chronicleId: number
}

const ChronicleDeletePopup = ({ chronicleId }: Props) => {
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

export default ChronicleDeletePopup
