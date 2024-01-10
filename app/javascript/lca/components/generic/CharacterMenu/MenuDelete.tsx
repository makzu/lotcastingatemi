import * as React from 'react'
import { connect } from 'react-redux'

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

import { State } from 'ducks'
import { destroy } from 'ducks/actions/ByType'
import { useDialogLogic } from 'hooks'
import { canIDelete } from 'selectors'
import { MenuItemProps as Props } from './CharacterMenuItem'

interface StateProps {
  canDelete: boolean
  name: string
}

interface DispatchProps {
  action(): void
}

interface InnerProps extends StateProps, DispatchProps, Props {}

const MenuDelete = ({ canDelete, action, name }: InnerProps) => {
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
          <Button onClick={action} color="primary" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

const mapState = (state: State, { id, characterType }: Props): StateProps => ({
  canDelete: canIDelete(state, id, characterType),
  name: state.entities.current[characterType + 's'][id].name,
})

const mapDispatch = (
  dispatch,
  { characterType, id }: Props,
): DispatchProps => ({ action: () => dispatch(destroy[characterType](id)) })

export default connect<StateProps, DispatchProps, Props>(
  mapState,
  mapDispatch,
)(MenuDelete)
