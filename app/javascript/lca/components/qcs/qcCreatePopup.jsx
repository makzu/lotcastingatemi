import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle,
} from 'material-ui/Dialog'
import Button from 'material-ui/Button'
import TextField from 'material-ui/TextField'

import { createQc } from '../../ducks/actions.js'

// TODO: Enable autofill for some example QCs?
class QcCreatePopup extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      open: false,
      qc: { name: '' },
    }
    this.handleOpen = this.handleOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleOpen() {
    this.setState({ open: true })
  }

  handleClose() {
    this.setState({ open: false })
  }

  handleChange(e) {
    this.setState({ qc: { ...this.state.qc, name: e.target.value }})
  }

  handleSubmit() {
    this.setState({ open: false })
    this.props.createQc(this.state.qc)
  }

  render() {
    const { handleOpen, handleClose, handleChange, handleSubmit } = this
    const { qc } = this.state

    return <span>
      <Button onClick={ handleOpen }>Create New</Button>
      <Dialog
        open={ this.state.open }
        onClose={ handleClose }
      >
        <DialogTitle>Create New Quick Character</DialogTitle>
        <DialogContent>
          <TextField name="name" value={ qc.name }
            label="Name" margin="normal"
            onChange={ handleChange }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={ handleClose }>Cancel</Button>
          <Button onClick={ handleSubmit } color="primary">Create</Button>
        </DialogActions>
      </Dialog>
    </span>
  }
}
QcCreatePopup.propTypes = {
  id: PropTypes.number.isRequired,
  createQc: PropTypes.func.isRequired,
}

function mapStateToProps(state) {
  const id = state.session.id

  return { id }
}

function mapDispatchToProps(dispatch) {
  return {
    createQc: (qc) => {
      dispatch(createQc(qc))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QcCreatePopup)
