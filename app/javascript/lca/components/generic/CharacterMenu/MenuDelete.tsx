import * as React from 'react'
import { connect } from 'react-redux'

import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Divider from '@material-ui/core/Divider'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import MenuItem from '@material-ui/core/MenuItem'
import Typography from '@material-ui/core/Typography'
import Delete from '@material-ui/icons/Delete'

import {
  destroyBattlegroup,
  destroyCharacter,
  destroyQc
} from 'ducks/actions.js'
import { destroy } from 'ducks/actions/ByType'
import { useDialogLogic } from 'hooks'
import { canIDelete } from 'selectors'
import { MenuItemProps as Props } from './CharacterMenu'

interface StateProps {
  canDelete: boolean
  name: string
}

interface DispatchProps {
  action(): void
}

interface InnerProps extends StateProps, DispatchProps, Props {}

const MenuDelete = ({ canDelete, action, name }: InnerProps) => {
  if (!canDelete) {
    return null
  }

  const [isOpen, setOpen, setClosed] = useDialogLogic()

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

const mapState = (state, props: Props): StateProps => ({
  canDelete: canIDelete(state, props.id, props.characterType),
  name: state.entities.current[props.characterType + 's'][props.id].name,
})

const mapDispatch = (
  dispatch,
  { characterType, id }: Props
): DispatchProps => ({ action: () => dispatch(destroy[characterType](id)) })

export default connect<StateProps, DispatchProps, Props>(
  mapState,
  mapDispatch
)(MenuDelete)
