// @flow
import React from 'react'
import { connect } from 'react-redux'

import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import TextField from '@material-ui/core/TextField'

import { createQc } from 'ducks/actions.js'
import type { Enhancer } from 'utils/flow-types'

type Props = {
  createQc: Function,
}
type State = {
  open: boolean,
  qc: Object,
}

// TODO: Enable autofill for some example QCs?
class QcCreatePopup extends React.Component<Props, State> {
  state = { open: false, qc: { name: '' } }

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
      <>
        <Button onClick={handleOpen} data-cy="create-qc">
          Create New
        </Button>
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
            <Button
              onClick={handleSubmit}
              variant="raised"
              color="primary"
              data-cy="submit"
            >
              Create
            </Button>
          </DialogActions>
        </Dialog>
      </>
    )
  }
}

const enhance: Enhancer<Props, {}> = connect(
  null,
  { createQc }
)

export default enhance(QcCreatePopup)
