// @flow
import React, { Component } from 'react'
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
  destroyCharacter,
  destroyQc,
  destroyBattlegroup,
} from 'ducks/actions.js'
import { canIDelete } from 'selectors'

type Props = {
  id: number,
  name: string,
  canDelete: boolean,
  characterType: string,
  destroyCharacter: Function,
  destroyQc: Function,
  destroyBattlegroup: Function,
}

class CardMenuDelete extends Component<Props, { open: boolean }> {
  constructor(props) {
    super(props)
    this.state = { open: false }
  }

  handleOpen = () => {
    this.setState({ open: true })
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  render() {
    if (!this.props.canDelete) return null

    let action
    switch (this.props.characterType) {
      case 'qc':
        action = this.props.destroyQc
        break
      case 'battlegroup':
        action = this.props.destroyBattlegroup
        break
      case 'character':
      default:
        action = this.props.destroyCharacter
    }

    return (
      <>
        <Divider />

        <MenuItem button onClick={this.handleOpen}>
          <ListItemIcon>
            <Delete />
          </ListItemIcon>
          <ListItemText primary="Delete" />
        </MenuItem>

        <Dialog open={this.state.open}>
          <DialogTitle>Delete {this.props.name}?</DialogTitle>

          <DialogContent>
            <Typography>This cannot be undone!</Typography>
          </DialogContent>

          <DialogActions>
            <Button onClick={this.handleClose}>Cancel</Button>
            <Button
              onClick={() => action(this.props.id)}
              color="primary"
              variant="raised"
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </>
    )
  }
}
const mapStateToProps = (state, props) => ({
  canDelete: canIDelete(state, props.id, props.characterType),
  name: state.entities.current[props.characterType + 's'][props.id].name,
})

export default connect(
  mapStateToProps,
  {
    destroyCharacter,
    destroyQc,
    destroyBattlegroup,
  }
)(CardMenuDelete)
