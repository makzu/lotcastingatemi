// @flow
import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

import Button from 'material-ui/Button'
import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle,
} from 'material-ui/Dialog'
import Divider from 'material-ui/Divider'
import { ListItemIcon, ListItemText } from 'material-ui/List'
import { MenuItem } from 'material-ui/Menu'
import Typography from 'material-ui/Typography'
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
    if (!this.props.canDelete) return <span />

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
      <Fragment>
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
      </Fragment>
    )
  }
}
const mapStateToProps = (state, props) => ({
  canDelete: canIDelete(state, props.id, props.characterType),
  name: state.entities.current[props.characterType + 's'][props.id].name,
})

export default connect(mapStateToProps, {
  destroyCharacter,
  destroyQc,
  destroyBattlegroup,
})(CardMenuDelete)
