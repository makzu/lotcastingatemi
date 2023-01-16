// @flow
import { Component } from 'react'
import { connect } from 'react-redux'

import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import TextField from '@mui/material/TextField'

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
class QcCreatePopup extends Component<Props, State> {
  state = { open: false, qc: { name: '' } }

  handleOpen = () => {
    this.setState({ open: true })
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  handleChange = (e) => {
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
              variant="standard"
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
              variant="contained"
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

const enhance: Enhancer<Props, {}> = connect(null, { createQc })

export default enhance(QcCreatePopup)
