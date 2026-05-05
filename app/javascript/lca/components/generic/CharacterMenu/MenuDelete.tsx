import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Typography,
} from '@material-ui/core'
import Delete from '@material-ui/icons/Delete'

import { destroy } from '@lca/ducks/actions/ByType'
import { useAppDispatch, useAppSelector, useDialogLogic } from '@lca/hooks'
import { canIDelete } from '@lca/selectors'
import type { MenuItemProps as Props } from './CharacterMenuItem'

const MenuDelete = ({ characterType, id }: Props) => {
  const dispatch = useAppDispatch()
  const canDelete = useAppSelector((state) =>
    canIDelete(state, id, characterType),
  )
  const name = useAppSelector(
    (state) => state.entities.current[`${characterType}s`][id]?.name,
  )
  const [isOpen, setOpen, setClosed] = useDialogLogic()

  if (!canDelete) {
    return null
  }

  return (
    <>
      <Divider />

      <MenuItem button onClick={setOpen}>
        <ListItemIcon>
          <Delete />
        </ListItemIcon>
        <ListItemText primary="Delete" />
      </MenuItem>

      <Dialog open={isOpen}>
        <DialogTitle>Delete {name}?</DialogTitle>

        <DialogContent>
          <Typography>This cannot be undone!</Typography>
        </DialogContent>

        <DialogActions>
          <Button onClick={setClosed}>Cancel</Button>
          <Button
            onClick={() => dispatch(destroy[characterType](id))}
            color="primary"
            variant="contained"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default MenuDelete
