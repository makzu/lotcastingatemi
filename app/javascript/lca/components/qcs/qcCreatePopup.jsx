// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'

import Button from 'material-ui/Button'
import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle,
} from 'material-ui/Dialog'
import TextField from 'material-ui/TextField'

import { createQc } from 'ducks/actions.js'

type Props = {
  id: number,
  createQc: Function,
}
// TODO: Enable autofill for some example QCs?
class QcCreatePopup extends Component<Props, { open: boolean, qc: Object }> {
  constructor(props: Props) {
    super(props)
    this.state = {
      open: false,
      qc: { name: '' },
    }
  }

  props: Props

  handleOpen = () => {
    this.setState({ open: true })
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  handleChange = e => {
    this.setState({ qc: { ...this.state.qc, name: e.target.value } })
  }

  handleSubmit = () => {
    this.setState({ open: false })
    this.props.createQc(this.state.qc)
  }

  render() {
    const { handleOpen, handleClose, handleChange, handleSubmit } = this
    const { qc } = this.state

    return (
      <span>
        <Button onClick={handleOpen}>Create New</Button>
        <Dialog open={this.state.open} onClose={handleClose}>
          <DialogTitle>Create New Quick Character</DialogTitle>
          <DialogContent>
            <TextField
              name="name"
              value={qc.name}
              label="Name"
              margin="normal"
              fullWidth
              onChange={handleChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSubmit} variant="raised" color="primary">
              Create
            </Button>
          </DialogActions>
        </Dialog>
      </span>
    )
  }
}
const mapStateToProps = state => ({ id: state.session.id })
export default connect(mapStateToProps, { createQc })(QcCreatePopup)
