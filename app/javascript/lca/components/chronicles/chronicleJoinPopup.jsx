// @flow
import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItem from '@material-ui/core/ListItem'
import TextField from '@material-ui/core/TextField'

import GroupAdd from '@material-ui/icons/GroupAdd'

import { joinChronicle } from 'ducks/actions.js'

type Props = { joinChronicle: Function }
type State = { open: boolean, code: string }
class ChronicleJoinPopup extends Component<Props, State> {
  constructor(props) {
    super(props)
    this.state = { open: false, code: '' }
  }

  handleOpen = () => {
    this.setState({ open: true })
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  handleChange = e => {
    this.setState({ code: e.target.value })
  }

  handleSubmit = () => {
    this.setState({ open: false })
    this.props.joinChronicle(this.state.code)
  }

  render() {
    const { handleOpen, handleClose, handleChange, handleSubmit } = this
    const { code } = this.state

    return (
      <Fragment>
        <ListItem button onClick={handleOpen}>
          <ListItemIcon>
            <GroupAdd />
          </ListItemIcon>

          <ListItemText primary="Join" />
        </ListItem>

        <Dialog open={this.state.open} onClose={handleClose}>
          <DialogTitle>Join a Chronicle</DialogTitle>
          <DialogContent>
            <TextField
              name="code"
              value={code}
              label="Invite Code"
              margin="normal"
              fullWidth
              onChange={handleChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSubmit} variant="raised" color="primary">
              Join
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    )
  }
}

export default connect(
  undefined,
  { joinChronicle }
)(ChronicleJoinPopup)
