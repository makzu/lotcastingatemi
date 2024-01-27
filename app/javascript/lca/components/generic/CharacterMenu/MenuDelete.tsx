import { Delete } from '@mui/icons-material'
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
} from '@mui/material'

import { destroy } from '@/ducks/actions/ByType'
import { useAppDispatch, useAppSelector, useDialogLogic } from '@/hooks'
import { canIDelete, getEntity } from '@/selectors'
import type { MenuItemProps as Props } from './CharacterMenuItem'

const MenuDelete = ({ id, characterType }: Props) => {
  const [isOpen, setOpen, setClosed] = useDialogLogic()
  const dispatch = useAppDispatch()
  const canDelete = useAppSelector((state) =>
    canIDelete(state, id, characterType),
  )
  const character = useAppSelector((state) =>
    getEntity[characterType](state, id),
  )
  const action = () => {
    dispatch(destroy[characterType](id))
  }
  if (!canDelete || !character) return null
  const { name } = character

  return (
    <>
      <Divider />

      <MenuItem onClick={setOpen}>
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
          <Button onClick={action} color="primary" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default MenuDelete
